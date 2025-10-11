import { useState } from "react";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes);

  return (
    <div className="bg-white shadow-sm p-4 rounded-lg">
      <p className="font-semibold">{post.user}</p>
      <p className="mt-1 text-gray-700">{post.text}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="mt-3 rounded-lg w-full object-cover max-h-80"
        />
      )}

      <button
        onClick={() => setLikes(likes + 1)}
        className="mt-3 text-sm text-indigo-600 font-medium"
      >
        ❤️ {likes} Likes
      </button>
    </div>
  );
}
