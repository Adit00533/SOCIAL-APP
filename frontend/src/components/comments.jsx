import React from "react";

function Comment({ comment }) {
  return (
    <div 
      className="pt-3 mt-3 text-sm transition-all duration-300 hover:translate-x-1"
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <span 
        className="font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
        style={{
          textShadow: "0 2px 8px rgba(124, 58, 237, 0.3)",
        }}
      >
        {comment.user}:{" "}
      </span>
      <span className="text-gray-300">
        {comment.text}
      </span>
    </div>
  );
}

export default Comment;