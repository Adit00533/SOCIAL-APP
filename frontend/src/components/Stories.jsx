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
    <div 
      className="p-4 rounded-2xl shadow-2xl mb-4 transition-all duration-300 hover:shadow-purple-900/30"
      style={{
        background: "rgba(26, 26, 46, 0.7)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <h2 
        className="font-bold mb-3 text-lg"
        style={{
          background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Stories
      </h2>
      
      <div 
        className="flex space-x-4 overflow-x-auto pb-2"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(124, 58, 237, 0.5) rgba(255, 255, 255, 0.1)",
        }}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="flex-shrink-0 flex flex-col items-center cursor-pointer group"
          >
            <div 
              className="relative transition-all duration-300 group-hover:scale-110"
              style={{
                padding: "3px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "50%",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-16 h-16 rounded-full object-cover"
                style={{
                  border: "2px solid rgba(26, 26, 46, 0.9)",
                }}
              />
            </div>
            <p 
              className="text-xs mt-2 text-center transition-colors duration-300"
              style={{ 
                color: "#d4d4d8",
                maxWidth: "70px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {story.name}
            </p>
          </div>
        ))}
      </div>

      {/* Story Popup */}
      {selectedStory && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
          style={{
            background: "rgba(0, 0, 0, 0.85)",
          }}
          onClick={() => setSelectedStory(null)}
        >
          <div 
            className="relative transition-all duration-300 hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedStory.image}
              alt={selectedStory.name}
              className="w-[350px] h-[500px] object-cover rounded-2xl shadow-2xl"
              style={{
                border: "2px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
              }}
            />
            <div 
              className="absolute bottom-0 left-0 right-0 text-center text-white text-lg font-semibold p-4 rounded-b-2xl"
              style={{
                background: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)",
              }}
            >
              {selectedStory.name}
            </div>
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        /* Custom scrollbar for stories */
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
    </div>
  );
};

export default Stories;