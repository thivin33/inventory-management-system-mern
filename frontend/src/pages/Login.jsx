import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CubeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ NEW

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // ❌ LOGIN FAILED
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ LOGIN SUCCESS
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      // Role-based redirect
      if (data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/staff-dashboard");
      }

    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-white">
        <Link to="/" className="flex items-center gap-2 text-sm mb-10">
          <ArrowLeftIcon className="w-4 h-4" />
          Back to home
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <CubeIcon className="w-7 h-7 text-blue-500" />
          <span className="font-semibold text-lg">Inventory</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-500 mb-8">
          Sign in to your account to continue
        </p>

        {/* ❌ ERROR MESSAGE */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
            {error.includes("No account") && (
              <div className="mt-1">
                <Link to="/signup" className="text-blue-600 underline">
                  Create an account
                </Link>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
            Sign in
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="text-center px-10">
          <CubeIcon className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Inventory Management
          </h2>
          <p className="text-blue-100">
            Track, manage, and optimize inventory with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
