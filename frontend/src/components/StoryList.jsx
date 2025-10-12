import { useState } from "react";
import StoryModal from "./StoryModal";

export default function StoryList() {
  const [stories, setStories] = useState([
    { id: 1, name: "Aditya", img: "https://i.pravatar.cc/300?img=1" },
    { id: 2, name: "Riya", img: "https://i.pravatar.cc/300?img=2" },
    { id: 3, name: "Karan", img: "https://i.pravatar.cc/300?img=3" },
    { id: 4, name: "Simran", img: "https://i.pravatar.cc/300?img=4" },
  ]);

  const [selectedStory, setSelectedStory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file);
  };

  const handleAddStory = () => {
    if (!newName.trim() || !newImageFile) {
      alert("Please enter your name and select an image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newStory = {
        id: Date.now(),
        name: newName,
        img: reader.result,
      };

      setStories([newStory, ...stories]);
      setNewName("");
      setNewImageFile(null);
      setShowAddModal(false);
    };

    reader.readAsDataURL(newImageFile);
  };

  return (
    <>
      {/* Story Bar */}
      <div 
        className="flex gap-4 overflow-x-auto p-4 rounded-2xl shadow-2xl"
        style={{
          background: "rgba(26, 26, 46, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(124, 58, 237, 0.5) rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Add Your Story Circle */}
        <div
          onClick={() => setShowAddModal(true)}
          className="flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 flex-shrink-0"
        >
          <div 
            className="w-16 h-16 rounded-full border-4 border-dashed flex items-center justify-center text-3xl font-bold"
            style={{
              borderColor: "rgba(167, 139, 250, 0.5)",
              background: "rgba(167, 139, 250, 0.1)",
              color: "#a78bfa",
            }}
          >
            +
          </div>
          <p 
            className="text-xs mt-2 font-semibold"
            style={{ color: "#a78bfa" }}
          >
            You
          </p>
        </div>

        {/* Existing Stories */}
        {stories.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelectedStory(s)}
            className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110 flex-shrink-0"
          >
            <img
              src={s.img}
              alt={s.name}
              className="w-16 h-16 rounded-full object-cover border-4"
              style={{
                borderColor: "#7c3aed",
                boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)",
              }}
            />
            <p 
              className="text-xs mt-2"
              style={{ color: "#d4d4d8" }}
            >
              {s.name}
            </p>
          </div>
        ))}
      </div>

      {/* Add Story Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div 
            className="p-8 rounded-2xl shadow-2xl w-full max-w-sm relative"
            style={{
              background: "rgba(26, 26, 46, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-xl font-bold transition-all duration-300 rounded-full w-8 h-8 flex items-center justify-center"
              style={{
                color: "#d4d4d8",
                background: "rgba(255, 255, 255, 0.05)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(239, 68, 68, 0.2)";
                e.target.style.color = "#ef4444";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
                e.target.style.color = "#d4d4d8";
              }}
            >
              ✕
            </button>

            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Add Your Story
            </h2>

            <input
              type="text"
              placeholder="Your name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="block w-full mb-4 p-3 rounded-xl transition-all duration-300 focus:outline-none"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#e4e4e7",
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

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full mb-4 p-3 rounded-xl transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#d4d4d8",
              }}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={handleAddStory}
                className="px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(124, 58, 237, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(124, 58, 237, 0.4)";
                }}
              >
                Submit
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2.5 rounded-xl font-semibold transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#d4d4d8",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Story Modal */}
      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}

      <style>{`
        div::-webkit-scrollbar {
          height: 6px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(124, 58, 237, 0.5);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(124, 58, 237, 0.7);
        }
      `}</style>
    </>
  );
}