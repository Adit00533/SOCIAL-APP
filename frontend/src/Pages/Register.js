import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);

      // save token + user info
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      // redirect to profile after signup
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Sign Up
      </button>

      <p
        className="mt-4 text-sm text-gray-600 cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </p>
    </form>
  );
}
