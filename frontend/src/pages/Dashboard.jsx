import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ================= HEADER ================= */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name || "Aspirant"} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Let’s improve your score today.
          </p>
        </div>

        {/* ================= STATS SECTION ================= */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">
              Total Attempts
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              12
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">
              Average Accuracy
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              78%
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">
              Tests Completed
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              8
            </p>
          </div>

        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="grid md:grid-cols-2 gap-6">

          <div
            onClick={() => navigate("/tests")}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-8 rounded-2xl cursor-pointer hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              Take a Mock Test
            </h3>
            <p className="text-blue-100 text-sm">
              Practice with real exam simulation and improve accuracy.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">
              Attempt History
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Review your past test performance and analyze mistakes.
            </p>

            <button
              className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              Coming Soon
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;