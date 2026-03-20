import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

function Home() {
    const [selectedCategory, setSelectedCategory] = useState("SSC Exams");
    const examCategories = {
    "SSC Exams": [
      "SSC CGL",
      "SSC CHSL",
      "SSC MTS",
      "SSC CPO",
      "SSC GD Constable",
      "SSC Stenographer",
      "SSC JE",
      "Delhi Police Constable",
    ],
    "Banking Exams": [
      "IBPS PO",
      "IBPS Clerk",
      "SBI PO",
      "SBI Clerk",
      "RBI Assistant",
      "NABARD Grade A",
      "RRB Office Assistant",
      "Bank of Baroda",
    ],
    "Railways Exams": [
      "RRB NTPC",
      "RRB Group D",
      "RRB JE",
      "RRB ALP",
      "RRB Technician",
    ],
    "Teaching Exams": [
      "CTET",
      "State TET",
      "KVS",
      "DSSSB",
      "Super TET",
    ],
  };
  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-36 pb-24 flex flex-col md:flex-row items-center gap-16">

        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Crack Competitive Exams with
            <span className="text-blue-600"> Smart Practice</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-xl">
            Real exam simulation, performance analytics,
            and structured mock tests designed to improve your
            accuracy and confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Start Free Mock Test
            </Link>

            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Trusted by thousands of aspirants preparing for SSC & Banking exams.
          </p>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Mock Test</span>
              <span className="text-blue-600 font-semibold">Live</span>
            </div>

            <div className="h-3 bg-gray-200 rounded-full">
              <div className="h-3 bg-blue-600 rounded-full w-3/4"></div>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-green-600 font-medium">Accuracy: 82%</span>
              <span className="text-gray-500">Time Left: 12:45</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="bg-white py-16 border-t border-b">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-blue-600">
              <CountUp end={12000} duration={2} separator="," />+
            </h3>
            <p className="text-gray-600 mt-2">Students Practicing</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600">
              <CountUp end={50000} duration={2} separator="," />+
            </h3>
            <p className="text-gray-600 mt-2">Tests Attempted</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600">
              <CountUp end={1200} duration={2} separator="," />+
            </h3>
            <p className="text-gray-600 mt-2">Questions Added</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-600">
              <CountUp end={95} duration={2} />%
            </h3>
            <p className="text-gray-600 mt-2">User Satisfaction</p>
          </div>
        </div>
      </section>

        {/* ================= DYNAMIC POPULAR EXAMS ================= */}
      <section id="exams" className="bg-white py-20 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-4 text-center">
            Popular Exams
          </h2>

          <p className="text-gray-600 text-center mb-10">
            Select a category to explore available exams
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(examCategories).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Exam Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {examCategories[selectedCategory].map((exam, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition flex justify-between items-center cursor-pointer"
              >
                <span className="font-medium">{exam}</span>
                <span className="text-gray-400 text-xl">›</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= PREMIUM TEST SERIES ================= */}
      <section id="tests" className="bg-gradient-to-b from-blue-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Popular Test Series
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                      SSC
                    </div>

                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                      846K+ Users
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-3">
                    SSC CGL 2026 Complete Mock Test Series
                  </h3>

                  <p className="text-sm text-gray-600 mb-3">
                    120 Total Tests •{" "}
                    <span className="text-green-600 font-medium">
                      8 Free Tests
                    </span>
                  </p>

                  <p className="text-xs text-blue-600 mb-4">
                    English • Hindi • 8 More
                  </p>

                  <ul className="text-sm text-gray-600 space-y-2 mb-6">
                    <li>• 5 Full Length Tests</li>
                    <li>• 40 Sectional Tests</li>
                    <li>• 75 Chapter Tests</li>
                    <li className="text-green-600">+ 100 More Tests</li>
                  </ul>
                </div>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Test Series
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              Explore All Test Series
            </button>
          </div>
        </div>
      </section>

      {/* ================= CONCEPT MASTERY HUB ================= */}
      <section className="bg-blue-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl p-12 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Concept Mastery Hub
            </h2>

            <p className="text-gray-700 text-lg max-w-3xl">
              Master every chapter with structured concepts,
              short tricks, formula sheets, and level-wise
              practice questions designed for SSC & Banking exams.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Structured Concepts",
              "Smart Tricks & Shortcuts",
              "Formula Sheets",
              "Level-wise Practice",
              "Previous Year Questions",
              "Speed Practice Mode",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2">{item}</h3>
                <p className="text-gray-600 text-sm">
                  Chapter-wise smart preparation system
                  designed for competitive exams.
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Explore Concept Mastery
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section id="why" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Why Choose MockPrep?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3">
                Real Exam Interface
              </h3>
              <p className="text-gray-600">
                Experience actual CBT-style mock tests with timer and palette.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3">
                Detailed Analytics
              </h3>
              <p className="text-gray-600">
                Track accuracy, weak areas, and improve strategically.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3">
                Focused Learning
              </h3>
              <p className="text-gray-600">
                No distractions. Just practice, analyze, and improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">
          Start Your Preparation Today
        </h2>

        <Link
          to="/auth"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Create Free Account
        </Link>
      </section>

      <Footer />

    </div>
  );
}

export default Home;