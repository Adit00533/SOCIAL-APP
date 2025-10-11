import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/feed");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px] text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-white font-semibold underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
