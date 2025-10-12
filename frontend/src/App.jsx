import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Messages from "./Pages/Messages";
import Profile from "./Pages/Profile";
import NotificationsPage from "./Pages/Notifications";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <Router> {/* ✅ Router MUST wrap everything that uses navigation */}
      <AuthProvider>
        <Navbar /> {/* ✅ Navbar is now inside Router */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
