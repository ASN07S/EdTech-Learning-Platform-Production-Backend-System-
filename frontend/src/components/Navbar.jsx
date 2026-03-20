import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  /* Scroll Effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Check Logged-in User */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  /* Close dropdown if clicked outside */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MockPrep
        </Link>

        {/* Center Links */}
        <div className="space-x-8 hidden md:flex">
          <a href="#exams" className="text-gray-600 hover:text-blue-600 transition">
            Exams
          </a>
          <a href="#tests" className="text-gray-600 hover:text-blue-600 transition">
            Test Series
          </a>
          <a href="#mastery" className="text-gray-600 hover:text-blue-600 transition">
            Mastery Hub
          </a>
          <a href="#why" className="text-gray-600 hover:text-blue-600 transition">
            Why Us
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">

          {!user ? (
            <>
              <Link
                to="/auth"
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Login
              </Link>

              <Link
                to="/auth"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                {/* Avatar circle */}
                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-semibold uppercase">
                  {user.name?.charAt(0)}
                </div>

                <span className="capitalize font-medium">
                  {user.name}
                </span>

                <span className="text-sm">▼</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl overflow-hidden animate-fadeIn">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;