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
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-xl mx-auto">
        <StoryList />

        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's happening?"
            className="w-full p-3 rounded-lg border border-gray-300 outline-none"
          ></textarea>

          {preview && (
            <div className="relative mt-3">
              <img src={preview} alt="preview" className="rounded-lg w-full max-h-64 object-cover" />
              <button
                onClick={() => { setPreview(null); setImage(null); }}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex justify-between items-center mt-3">
            <label className="cursor-pointer bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300">
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
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Post
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
