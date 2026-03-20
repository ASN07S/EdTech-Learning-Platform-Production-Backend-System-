import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-black text-white flex flex-col p-6">

      <h2 className="text-2xl font-bold mb-10">
        MockPrep
      </h2>

      <nav className="space-y-4">

        <Link
          to="/dashboard"
          className="block hover:bg-gray-800 px-3 py-2 rounded-lg"
        >
          Dashboard
        </Link>

        <Link
          to="/tests"
          className="block hover:bg-gray-800 px-3 py-2 rounded-lg"
        >
          Test Series
        </Link>

        <Link
          to="/practice"
          className="block hover:bg-gray-800 px-3 py-2 rounded-lg"
        >
          Practice
        </Link>

        <Link
          to="/history"
          className="block hover:bg-gray-800 px-3 py-2 rounded-lg"
        >
          Attempt History
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;