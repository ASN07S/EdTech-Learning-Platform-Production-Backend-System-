import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Tests() {
  const [tests, setTests] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await API.get("/tests");
        setTests(data);
      } catch (error) {
        console.error("Error fetching tests", error);
      }
    };

    fetchTests();
  }, []);

  const handleStart = (id) => {
    navigate(`/series/${id}`);
  };

  const categories = ["All", "Banking", "SSC", "Railways"];

  const Card = ({ test }) => (
    <div className="bg-gradient-to-b from-purple-200 to-purple-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <div className="flex justify-between items-center mb-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
          <span className="text-sm font-bold text-purple-600">
            {test.title?.charAt(0)}
          </span>
        </div>

        <span className="text-xs bg-white px-3 py-1 rounded-full shadow">
          ⚡ {Math.floor(Math.random() * 900)}k Users
        </span>
      </div>

      <h3 className="font-semibold text-sm mb-2 line-clamp-2">
        {test.title}
      </h3>

      <p className="text-xs text-gray-700 mb-1">
        {Math.floor(Math.random() * 1500)} Total Tests
        <span className="text-green-600 ml-2">
          | {Math.floor(Math.random() * 20)} Free Tests
        </span>
      </p>

      <p className="text-xs text-blue-600 mb-4">
        English, Hindi + More
      </p>

      <ul className="text-xs text-gray-600 space-y-1 mb-5">
        <li>• 5 Live Test</li>
        <li>• 25 Chapter Test</li>
        <li>• 10 Special Tests</li>
        <li className="text-green-600">
          +{Math.floor(Math.random() * 800)} more tests
        </li>
      </ul>

      <div className="flex gap-3">
        <button
          onClick={() => handleStart(test.id)}
          className="flex-1 bg-cyan-500 text-white py-2 rounded-lg text-sm hover:bg-cyan-600 transition"
        >
          View Test Series
        </button>

        <button className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center text-cyan-600 text-lg">
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-10 space-y-16">

      {/* ================= 1️⃣ RECENT TEST SERIES ================= */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Your Recent Test Series
          </h1>

          <button className="text-cyan-600 text-sm font-medium">
            View all Attempted Tests
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {tests.slice(0, 4).map((test) => (
            <Card key={test.id} test={test} />
          ))}
        </div>
      </div>


      {/* ================= 2️⃣ POPULAR TEST SERIES ================= */}
      <div>
        <h1 className="text-2xl font-bold mb-8">
          Popular Test Series
        </h1>

        <div className="grid md:grid-cols-4 gap-8">
          {tests.map((test) => (
            <Card key={test.id} test={test} />
          ))}
        </div>
      </div>


      {/* ================= 3️⃣ TEST SERIES BY CATEGORY ================= */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            Test Series by Categories
          </h1>

          <input
            type="text"
            placeholder="Search Test Series"
            className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-10">

          {/* LEFT CATEGORY */}
          <div className="w-64 bg-white rounded-xl shadow-sm p-6">
            <ul className="space-y-4 text-sm">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`cursor-pointer px-3 py-2 rounded-lg transition ${
                    activeCategory === cat
                      ? "bg-gray-200 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT GRID */}
          <div className="flex-1 grid md:grid-cols-3 gap-8">
            {tests.map((test) => (
              <Card key={test.id} test={test} />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}

export default Tests;