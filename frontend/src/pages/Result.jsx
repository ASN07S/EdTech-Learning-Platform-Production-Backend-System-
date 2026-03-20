import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No result data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Test Result
        </h2>

        <div className="space-y-3 text-lg">
          <p><strong>Total Questions:</strong> {result.total_questions}</p>
          <p><strong>Attempted:</strong> {result.attempted}</p>
          <p><strong>Correct:</strong> {result.correct}</p>
          <p><strong>Wrong:</strong> {result.wrong}</p>
          <p><strong>Score:</strong> {result.score}</p>
          <p>
            <strong>Accuracy:</strong>{" "}
            <span className="text-blue-600 font-semibold">
              {result.accuracy}%
            </span>
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Result;