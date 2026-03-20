import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ================= Motivational Messages ================= */
  const messages = [
    "Consistency beats talent.",
    "Every mock test makes you stronger.",
    "Small improvements. Big results.",
    "Your rank is built daily.",
    "Practice. Analyze. Improve.",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ================= Form Logic ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        await API.post("/auth/register", form);
        setIsRegister(false);
      } else {
        const { data } = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-gray-100">

      {/* ================= FORM SECTION ================= */}
      <div className="absolute inset-0 flex transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]">

        {/* LOGIN FORM */}
        <div
          className={`w-1/2 flex items-center justify-center transition-all duration-700 ${
            isRegister
              ? "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="w-96">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                {loading ? "Processing..." : "Login"}
              </button>
            </form>
          </div>
        </div>

        {/* REGISTER FORM */}
        <div
          className={`w-1/2 flex items-center justify-center transition-all duration-700 ${
            isRegister
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="w-96">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                {loading ? "Processing..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= BLUE SLIDING PANEL ================= */}
      <div
        className={`absolute top-0 h-full w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 text-white flex flex-col justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isRegister ? "left-0" : "left-1/2"
        }`}
      >
        <h2 className="text-4xl font-bold mb-6 text-center">
          {isRegister ? "Welcome Back!" : "Hello, Future Topper!"}
        </h2>

        {/* Animated Motivational Text */}
        <p
          key={currentMessage}
          className="mb-8 text-blue-100 text-center max-w-sm animate-fadeIn"
        >
          {messages[currentMessage]}
        </p>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition"
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
}

export default Auth;