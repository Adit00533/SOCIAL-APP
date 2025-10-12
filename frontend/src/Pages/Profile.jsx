import { useParams } from "react-router-dom";
import FollowButton from "../Pages/FollowButton.jsx";
import PostCard from "../components/PostCard.jsx";

const DUMMY_POSTS = [
  { id: 10, user: "Aditya V", handle: "@aditya", time: "1d", more: "", content: "Built a clean frontend today!", media: null, likes: 12, comments: 2 },
  { id: 11, user: "Aditya V", handle: "@aditya", time: "4d", more: "", content: "Learning advanced React patterns.", media: "https://picsum.photos/800/300?random=3", likes: 8, comments: 1 }
];

export default function Profile() {
  const { id } = useParams();

  const user = {
    id,
    username: "Aditya V",
    bio: "Frontend developer • React enthusiast",
    followers: 1024,
    following: 256,
    avatar: null
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-6">
      {/* Profile Card */}
      <div 
        className="p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-purple-900/30"
        style={{
          background: "rgba(26, 26, 46, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex items-center gap-6 flex-wrap">
          {/* Avatar */}
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "3px solid rgba(102, 126, 234, 0.3)",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
            }}
          >
            {user.username[0]}
          </div>
          
          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <h2 
                  className="text-3xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 2px 10px rgba(124, 58, 237, 0.3)",
                  }}
                >
                  {user.username}
                </h2>
                <p 
                  className="text-base mt-2"
                  style={{ color: "#d4d4d8" }}
                >
                  {user.bio}
                </p>
                <div 
                  className="flex items-center gap-4 text-sm mt-3"
                  style={{ color: "#a1a1aa" }}
                >
                  <span 
                    className="transition-colors duration-300 cursor-pointer"
                    style={{
                      onMouseEnter: (e) => e.target.style.color = "#a78bfa",
                      onMouseLeave: (e) => e.target.style.color = "#a1a1aa"
                    }}
                  >
                    <span style={{ fontWeight: "600", color: "#ffffff" }}>{user.followers}</span> followers
                  </span>
                  <span style={{ color: "#52525b" }}>•</span>
                  <span 
                    className="transition-colors duration-300 cursor-pointer"
                  >
                    <span style={{ fontWeight: "600", color: "#ffffff" }}>{user.following}</span> following
                  </span>
                </div>
              </div>
              <FollowButton initial={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {DUMMY_POSTS.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </div>
  );
}