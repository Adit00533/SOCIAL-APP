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
    <header className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">Connectify</Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <Link to="/" className="hover:text-primary">Feed</Link>
          <Link to="/messages" className="hover:text-primary">Messages</Link>
          <Link to="/notifications" className="hover:text-primary">Notifications</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to={`/profile/${user.id}`} className="hidden md:block text-sm">{user.username}</Link>
              <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-primary">Login</Link>
              <Link to="/register" className="bg-primary text-white px-3 py-1 rounded-md text-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
