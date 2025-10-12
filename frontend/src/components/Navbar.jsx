import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header 
      className="shadow-2xl sticky top-0 z-40"
      style={{
        background: "rgba(26, 26, 46, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Connectify
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link 
            to="/" 
            className="relative transition-all duration-300"
            style={{ color: "#e4e4e7", fontWeight: "500" }}
            onMouseEnter={(e) => {
              e.target.style.color = "#a78bfa";
              e.target.querySelector('.nav-underline').style.width = "100%";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#e4e4e7";
              e.target.querySelector('.nav-underline').style.width = "0";
            }}
          >
            Feed
            <span 
              className="nav-underline absolute bottom-[-4px] left-0 h-[2px] transition-all duration-300"
              style={{
                width: "0",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            />
          </Link>
          <Link 
            to="/messages" 
            className="relative transition-all duration-300"
            style={{ color: "#e4e4e7", fontWeight: "500" }}
            onMouseEnter={(e) => {
              e.target.style.color = "#a78bfa";
              e.target.querySelector('.nav-underline').style.width = "100%";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#e4e4e7";
              e.target.querySelector('.nav-underline').style.width = "0";
            }}
          >
            Messages
            <span 
              className="nav-underline absolute bottom-[-4px] left-0 h-[2px] transition-all duration-300"
              style={{
                width: "0",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            />
          </Link>
          <Link 
            to="/notifications" 
            className="relative transition-all duration-300"
            style={{ color: "#e4e4e7", fontWeight: "500" }}
            onMouseEnter={(e) => {
              e.target.style.color = "#a78bfa";
              e.target.querySelector('.nav-underline').style.width = "100%";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#e4e4e7";
              e.target.querySelector('.nav-underline').style.width = "0";
            }}
          >
            Notifications
            <span 
              className="nav-underline absolute bottom-[-4px] left-0 h-[2px] transition-all duration-300"
              style={{
                width: "0",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            />
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link 
                to={`/profile/${user.id}`} 
                className="hidden md:block text-sm font-medium transition-colors duration-300"
                style={{ color: "#d4d4d8" }}
                onMouseEnter={(e) => e.target.style.color = "#a78bfa"}
                onMouseLeave={(e) => e.target.style.color = "#d4d4d8"}
              >
                {user.username}
              </Link>
              <button 
                onClick={logout} 
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(239, 68, 68, 0.3)";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium transition-colors duration-300"
                style={{ color: "#a78bfa" }}
                onMouseEnter={(e) => e.target.style.color = "#c4b5fd"}
                onMouseLeave={(e) => e.target.style.color = "#a78bfa"}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
                }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}