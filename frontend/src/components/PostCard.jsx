import { useState } from "react";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div 
      className="shadow-2xl p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-4px]"
      style={{
        background: "rgba(26, 26, 46, 0.7)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(102, 126, 234, 0.2)";
        e.currentTarget.style.borderColor = "rgba(102, 126, 234, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
      }}
    >
      <p 
        className="font-bold text-lg"
        style={{
          background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {post.user}
      </p>
      <p 
        className="mt-2 text-base leading-relaxed"
        style={{ color: "#d4d4d8" }}
      >
        {post.text}
      </p>

      {post.image && (
        <div className="mt-4 rounded-xl overflow-hidden">
          <img
            src={post.image}
            alt="post"
            className="w-full object-cover max-h-80 transition-transform duration-300 hover:scale-105"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>
      )}

      <button
        onClick={handleLike}
        className="mt-4 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300"
        style={{
          background: liked 
            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
            : "rgba(255, 255, 255, 0.05)",
          color: liked ? "#ffffff" : "#a78bfa",
          border: liked 
            ? "1px solid rgba(16, 185, 129, 0.3)"
            : "1px solid rgba(167, 139, 250, 0.3)",
          boxShadow: liked 
            ? "0 4px 15px rgba(16, 185, 129, 0.3)"
            : "0 2px 8px rgba(0, 0, 0, 0.2)",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = liked
            ? "0 6px 20px rgba(16, 185, 129, 0.4)"
            : "0 4px 12px rgba(167, 139, 250, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = liked
            ? "0 4px 15px rgba(16, 185, 129, 0.3)"
            : "0 2px 8px rgba(0, 0, 0, 0.2)";
        }}
      >
        ❤️ {likes} Likes
      </button>
    </div>
  );
}