import { useEffect, useState } from "react";
import { getAllPosts, likePost } from "../api/api";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getAllPosts();
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleLike = async (id) => {
    await likePost(id);
    setPosts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <div className="p-6">
      {posts.map((p) => (
        <div key={p._id} className="border p-4 mb-4">
          <h3 className="font-bold">@{p.username}</h3>
          <p>{p.text}</p>
          <button
            onClick={() => handleLike(p._id)}
            className="text-blue-500 mt-2"
          >
            ❤️ {p.likes}
          </button>
        </div>
      ))}
    </div>
  );
}
