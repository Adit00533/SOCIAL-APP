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
    <div 
      className="flex items-center justify-center min-h-screen px-4"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div 
        className="p-8 rounded-2xl shadow-2xl w-full max-w-[400px] transition-all duration-300 hover:shadow-purple-900/30"
        style={{
          background: "rgba(26, 26, 46, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h2 
          className="text-3xl font-bold mb-2 text-center"
          style={{
            background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 2px 10px rgba(124, 58, 237, 0.3)",
          }}
        >
          Create Account
        </h2>
        
        <p 
          className="text-center mb-6 text-sm"
          style={{ color: "#a1a1aa" }}
        >
          Join us and start connecting
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 rounded-xl outline-none transition-all duration-300 text-white placeholder-gray-400"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.08)";
              e.target.style.borderColor = "#7c3aed";
              e.target.style.boxShadow = "0 0 0 3px rgba(124, 58, 237, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.boxShadow = "none";
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded-xl outline-none transition-all duration-300 text-white placeholder-gray-400"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.08)";
              e.target.style.borderColor = "#7c3aed";
              e.target.style.boxShadow = "0 0 0 3px rgba(124, 58, 237, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.boxShadow = "none";
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded-xl outline-none transition-all duration-300 text-white placeholder-gray-400"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.08)";
              e.target.style.borderColor = "#7c3aed";
              e.target.style.boxShadow = "0 0 0 3px rgba(124, 58, 237, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.boxShadow = "none";
            }}
            required
          />
          <button
            onClick={handleSubmit}
            className="w-full font-semibold py-3 rounded-xl transition-all duration-300 text-white"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(124, 58, 237, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(124, 58, 237, 0.4)";
            }}
          >
            Register
          </button>
        </div>

        <p 
          className="text-center mt-6 text-sm"
          style={{ color: "#d4d4d8" }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="font-semibold cursor-pointer transition-colors duration-300"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = "none";
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}