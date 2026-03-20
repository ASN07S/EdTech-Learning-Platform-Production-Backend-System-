import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function TestSeriesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [series, setSeries] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const { data } = await API.get(`/series/${id}`);
        setSeries(data.series);
        setTests(data.tests);
      } catch (err) {
        console.error("Error loading series", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!series) {
    return <div className="p-10">Series Not Found</div>;
  }

  return (
    <div className="p-10">

      {/* ================= HEADER SECTION ================= */}
      <div className="bg-purple-200 p-8 rounded-2xl mb-10">
        <h1 className="text-3xl font-bold mb-3">
          {series.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-gray-700">
          <span>{tests.length} Total Tests</span>
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
            3 FREE TESTS
          </span>
          <span>English, Hindi</span>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-4 mb-8">
        <button className="bg-cyan-500 text-white px-5 py-2 rounded-full">
          Mock Tests
        </button>

        <button className="bg-gray-200 px-5 py-2 rounded-full">
          PYPs
        </button>
      </div>

      {/* ================= TEST LIST ================= */}
      <div className="space-y-6">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {test.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {test.total_marks} Marks • {test.duration_minutes} mins
              </p>
            </div>

            <button
              onClick={() => navigate(`/test/${test.id}`)}
              className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition"
            >
              Start Now
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default TestSeriesDetails;