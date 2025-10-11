import { useState } from "react";

const Stories = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const stories = [
    { id: 1, name: "Iron Man", image: "https://i.imgur.com/7yUvePI.jpg" },
    { id: 2, name: "Captain America", image: "https://i.imgur.com/qVbUuO2.jpg" },
    { id: 3, name: "Thor", image: "https://i.imgur.com/9z1z1kM.jpg" },
    { id: 4, name: "Hulk", image: "https://i.imgur.com/4D9Q9yA.jpg" },
    { id: 5, name: "Black Widow", image: "https://i.imgur.com/nk9EwJU.jpg" },
    { id: 6, name: "Hawkeye", image: "https://i.imgur.com/SfrZC2J.jpg" },
    { id: 7, name: "Spider-Man", image: "https://i.imgur.com/lYJHBBt.jpg" },
    { id: 8, name: "Doctor Strange", image: "https://i.imgur.com/DpPzCzK.jpg" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-md mb-4">
      <h2 className="font-semibold mb-2 text-gray-800 dark:text-white">Stories</h2>
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="flex-shrink-0 flex flex-col items-center cursor-pointer"
          >
            <img
              src={story.image}
              alt={story.name}
              className="w-16 h-16 rounded-full border-4 border-blue-500 object-cover hover:scale-105 transition-transform"
            />
            <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{story.name}</p>
          </div>
        ))}
      </div>

      {/* Story Popup */}
      {selectedStory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedStory(null)}
        >
          <div className="relative">
            <img
              src={selectedStory.image}
              alt={selectedStory.name}
              className="w-[350px] h-[500px] object-cover rounded-2xl shadow-lg"
            />
            <p className="absolute bottom-4 left-0 right-0 text-center text-white text-lg font-semibold bg-black/40 p-2 rounded-b-2xl">
              {selectedStory.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
