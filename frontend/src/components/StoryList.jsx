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

      setStories([newStory, ...stories]); // Add new story to the beginning
      setNewName("");
      setNewImageFile(null);
      setShowAddModal(false);
    };

    reader.readAsDataURL(newImageFile);
  };

  return (
    <>
      {/* Story Bar */}
      <div className="flex gap-3 overflow-x-auto p-3 bg-white rounded-lg shadow-sm m-0">
        {/* Add Your Story Circle */}
        <div
          onClick={() => setShowAddModal(true)}
          className="flex flex-col items-center justify-center cursor-pointer transition hover:scale-105"
        >
          <div className="w-16 h-16 rounded-full border-4 border-dashed border-indigo-400 flex items-center justify-center text-indigo-500 text-3xl font-bold bg-gray-100">
            +
          </div>
          <p className="text-xs mt-1 text-indigo-600 font-semibold">You</p>
        </div>

        {/* Existing Stories */}
        {stories.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelectedStory(s)}
            className="flex flex-col items-center cursor-pointer transition hover:scale-105"
          >
            <img
              src={s.img}
              alt={s.name}
              className="w-16 h-16 rounded-full border-4 border-indigo-500 object-cover"
            />
            <p className="text-xs mt-1">{s.name}</p>
          </div>
        ))}
      </div>

      {/* Add Story Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">Add Your Story</h2>

            <input
              type="text"
              placeholder="Your name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="block w-full mb-3 p-2 border rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full mb-3 p-2 border rounded bg-white"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddStory}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Submit
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
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
    </>
  );
}
