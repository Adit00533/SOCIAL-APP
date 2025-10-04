import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/api";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 block mb-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 block mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Login
      </button>
    </form>
  );
}
