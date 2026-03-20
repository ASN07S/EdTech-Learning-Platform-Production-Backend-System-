import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [attemptId, setAttemptId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [review, setReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);

  // 🔹 Start Test
  useEffect(() => {
    const startTest = async () => {
      try {
        const { data } = await API.post("/tests/start", {
          test_id: id,
        });

        setAttemptId(data.attempt.id);
        setQuestions(data.questions);
        setTimeLeft(data.duration * 60);

        if (data.questions.length > 0) {
          setVisited({ [data.questions[0].id]: true });
        }

      } catch (error) {
        console.error("Error starting test", error);
      }
    };

    startTest();
  }, [id]);

  // 🔹 Timer
  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const goToQuestion = (index) => {
    setCurrentIndex(index);
    setVisited({
      ...visited,
      [questions[index].id]: true,
    });
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      question_id: questionId,
      selected_option: answers[questionId],
    }));

    try {
      const { data } = await API.post("/tests/submit", {
        attempt_id: attemptId,
        answers: formattedAnswers,
      });

      navigate("/result", { state: data.result });

    } catch (error) {
      console.error("Submit error", error);
    }
  };

  if (questions.length === 0 || timeLeft === null) {
    return <p className="text-center mt-10">Loading test...</p>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex gap-6 max-w-6xl mx-auto">

        {/* LEFT SIDE - QUESTION AREA */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md">

          {/* TIMER */}
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Time Left:</span>
            <span className="text-red-500 font-bold">
              {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          </div>

          <h2 className="text-lg font-semibold mb-4">
            Question {currentIndex + 1} of {questions.length}
          </h2>

          <p className="mb-4">{currentQuestion.question_text}</p>

          <div className="space-y-3">
            {["option_a", "option_b", "option_c", "option_d"].map((key, index) => {
              const optionLetter = String.fromCharCode(65 + index);

              return (
                <button
                  key={key}
                  onClick={() =>
                    handleOptionSelect(currentQuestion.id, optionLetter)
                  }
                  className={`w-full text-left p-3 border rounded-lg ${
                    answers[currentQuestion.id] === optionLetter
                      ? "bg-green-100 border-green-500"
                      : ""
                  }`}
                >
                  {optionLetter}. {currentQuestion[key]}
                </button>
              );
            })}
          </div>

          {/* MARK FOR REVIEW */}
          <button
            onClick={() =>
              setReview({
                ...review,
                [currentQuestion.id]: !review[currentQuestion.id],
              })
            }
            className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-lg"
          >
            {review[currentQuestion.id]
              ? "Unmark Review"
              : "Mark for Review"}
          </button>

          {/* NAVIGATION */}
          <div className="flex justify-between mt-6">
            <button
              disabled={currentIndex === 0}
              onClick={() => goToQuestion(currentIndex - 1)}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() => goToQuestion(currentIndex + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - QUESTION PALETTE */}
        <div className="w-72 bg-white p-4 rounded-xl shadow-md">
          <h3 className="font-semibold mb-4 text-center">
            Question Palette
          </h3>

          <div className="grid grid-cols-5 gap-3">
            {questions.map((q, index) => {

              let bgColor = "bg-gray-300"; // Not visited

              if (visited[q.id] && !answers[q.id] && !review[q.id]) {
                bgColor = "bg-red-400";
              }

              if (answers[q.id] && !review[q.id]) {
                bgColor = "bg-green-500";
              }

              if (review[q.id] && !answers[q.id]) {
                bgColor = "bg-yellow-400";
              }

              if (review[q.id] && answers[q.id]) {
                bgColor = "bg-yellow-500";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(index)}
                  className={`w-10 h-10 text-white rounded ${bgColor}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default TestPage;