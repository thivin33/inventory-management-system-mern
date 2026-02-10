import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CubeIcon } from "@heroicons/react/24/outline";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    // Save token if backend sends it (optional)
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    localStorage.setItem("role", form.role);
    localStorage.setItem("name", form.name); 

    // Role based redirect
    if (form.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/staff-dashboard");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-white">
        <div className="flex items-center gap-2 mb-10">
          <CubeIcon className="w-7 h-7 text-blue-500" />
          <span className="font-semibold text-lg">Inventory</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">Create your account</h1>
        <p className="text-gray-500 mb-8">
          Get started with inventory management
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg">
            Create account
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="text-center px-10">
          <CubeIcon className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Join the Team</h2>
          <p className="text-blue-100">
            Choose your role and start managing inventory.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
