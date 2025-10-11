import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/feed");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-cyan-500">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px] text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-white font-semibold underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
