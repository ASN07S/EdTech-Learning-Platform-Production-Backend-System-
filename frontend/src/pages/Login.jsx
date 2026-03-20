import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE - Branding */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-600 to-blue-400 text-white flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-6">
          Welcome Back to MockPrep
        </h1>
        <p className="text-lg text-blue-100 max-w-md">
          Continue your preparation journey.
          Practice smarter, analyze better,
          and improve your exam performance.
        </p>

        <div className="mt-10 space-y-4 text-sm text-blue-100">
          <p>✔ Real Exam Interface</p>
          <p>✔ Detailed Analytics</p>
          <p>✔ Concept Mastery Hub</p>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">
            Login
          </h2>

          <p className="text-gray-500 text-sm mb-8 text-center">
            Enter your credentials to access your dashboard
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-sm mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;