import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function AppLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <div
        className={`bg-gray-900 text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } p-6`}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold">
            {collapsed ? "MP" : "MockPrep"}
          </h2>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 text-sm"
          >
            ☰
          </button>
        </div>

        <nav className="space-y-6 text-sm">
          <button
            onClick={() => navigate("/dashboard")}
            className="block w-full text-left hover:text-blue-400 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/tests")}
            className="block w-full text-left hover:text-blue-400 transition"
          >
            Test Series
          </button>

          <button className="block w-full text-left hover:text-blue-400 transition">
            Practice
          </button>

          <button
            onClick={() => navigate("/pass")}
            className="block w-full text-left hover:text-blue-400"
          >
             Pass
          </button>

          <button className="block w-full text-left hover:text-blue-400 transition">
            Attempt History
          </button>
        </nav>
      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col">

        {/* ================= UPDATED TOPBAR ================= */}
        <div className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">

          {/* Left: Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search exams, tests..."
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6 ml-6">

            <button 
             onClick={() => navigate("/pass")}
             className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              Get Pass
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg">

              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium truncate max-w-[100px]">
                  {user?.name}
                </span>
                <span className="text-xs text-gray-500">
                  Active User
                </span>
              </div>

            </div>

            <button
              onClick={handleLogout}
              className="text-red-500 text-sm font-medium hover:text-red-600 transition"
            >
              Logout
            </button>

          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-10">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AppLayout;