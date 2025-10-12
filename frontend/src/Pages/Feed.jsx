import StoryList from "../components/StoryList";
import PostCard from "../components/PostCard";
import { useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([
    { id: 1, user: "Aditya", text: "Just chilling with React 😎", likes: 5, image: null },
    { id: 2, user: "Riya", text: "Love the new UI design! 💜", likes: 12, image: "https://source.unsplash.com/400x300/?nature" },
  ]);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    if (newPost.trim() === "" && !image) return;
    const newPostObj = {
      id: posts.length + 1,
      user: "You",
      text: newPost,
      likes: 0,
      image: preview || null,
    };
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div 
      className="min-h-screen pt-20"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-xl mx-auto px-4">
        <StoryList />
        
        <div 
          className="rounded-2xl p-5 mt-4 shadow-2xl transition-all duration-300 hover:shadow-purple-900/20"
          style={{
            background: "rgba(26, 26, 46, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's happening?"
            className="w-full p-4 rounded-xl resize-none text-white placeholder-gray-400 transition-all duration-300 focus:outline-none"
            rows="3"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.08)";
              e.target.style.borderColor = "#7c3aed";
              e.target.style.boxShadow = "0 0 0 3px rgba(124, 58, 237, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.boxShadow = "none";
            }}
          />
          
          {preview && (
            <div className="relative mt-4 rounded-xl overflow-hidden">
              <img 
                src={preview} 
                alt="preview" 
                className="w-full max-h-64 object-cover"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              />
              <button
                onClick={() => { setPreview(null); setImage(null); }}
                className="absolute top-3 right-3 text-white text-sm px-3 py-1.5 rounded-full font-semibold transition-all duration-300 hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)",
                }}
              >
                ✕
              </button>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-4 gap-3">
            <label 
              className="cursor-pointer px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-gray-300"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "#a78bfa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.color = "#d1d5db";
              }}
            >
              📷 Add Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            
            <button
              onClick={handlePost}
              disabled={newPost.trim() === "" && !image}
              className="px-6 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: (newPost.trim() !== "" || image)
                  ? "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)"
                  : "rgba(124, 58, 237, 0.3)",
                boxShadow: (newPost.trim() !== "" || image)
                  ? "0 4px 15px rgba(124, 58, 237, 0.4)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (newPost.trim() !== "" || image) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(124, 58, 237, 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = (newPost.trim() !== "" || image)
                  ? "0 4px 15px rgba(124, 58, 237, 0.4)"
                  : "none";
              }}
            >
              Post
            </button>
          </div>
        </div>
        
        <div className="mt-6 space-y-4 pb-8">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}