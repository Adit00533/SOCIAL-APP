import { useState } from "react";
import Notifications from "../components/Notifications.jsx";

export default function RightSidebar() {
  const suggestions = [
    { id: 1, name: "Riya Patel", username: "riyap" },
    { id: 2, name: "Sai Kumar", username: "saik" },
  ];

  const notifications = [
    { id: 1, text: "Karan started following you", time: "1d", icon: "👋" },
    { id: 2, text: "Neha liked your post", time: "2d", icon: "❤️" },
  ];

  const [followed, setFollowed] = useState({});

  const handleFollow = (id) => {
    setFollowed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-4">
      {/* Who to Follow Card */}
      <div 
        className="p-5 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-purple-900/20"
        style={{
          background: "rgba(26, 26, 46, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h4 
          className="font-bold text-lg mb-4"
          style={{
            background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Who to follow
        </h4>
        
        <div className="space-y-4">
          {suggestions.map((user) => (
            <div 
              key={user.id} 
              className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  {user.name[0]}
                </div>
                <div>
                  <div 
                    className="font-semibold text-sm"
                    style={{ color: "#e4e4e7" }}
                  >
                    {user.name}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: "#a1a1aa" }}
                  >
                    @{user.username}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleFollow(user.id)}
                className="text-sm px-4 py-1.5 rounded-lg font-semibold transition-all duration-300"
                style={{
                  background: followed[user.id]
                    ? "rgba(255, 255, 255, 0.1)"
                    : "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  color: "white",
                  border: followed[user.id] ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
                  boxShadow: followed[user.id] 
                    ? "none" 
                    : "0 4px 12px rgba(124, 58, 237, 0.3)",
                }}
                onMouseEnter={(e) => {
                  if (!followed[user.id]) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 16px rgba(124, 58, 237, 0.4)";
                  } else {
                    e.target.style.background = "rgba(255, 255, 255, 0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  if (!followed[user.id]) {
                    e.target.style.boxShadow = "0 4px 12px rgba(124, 58, 237, 0.3)";
                  } else {
                    e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  }
                }}
              >
                {followed[user.id] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <Notifications items={notifications} />
    </div>
  );
}