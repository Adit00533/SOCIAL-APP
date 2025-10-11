import { useState } from "react";
import Notifications from "../components/Notifications.jsx";

export default function RightSidebar() {
  const suggestions = [
    { id: 1, name: "Riya Patel", username: "riyap" },
    { id: 2, name: "Sai Kumar", username: "saik" },
  ];

  const notifications = [
    { id: 1, text: "Karan started following you", time: "1d", icon: "👋" },
    { id: 2, text: "Neha liked your post", time: "2d", icon: "❤️" },
  ];

  // Track follow status for each suggestion
  const [followed, setFollowed] = useState({});

  const handleFollow = (id) => {
    setFollowed((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle follow/unfollow on every click
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-2xl shadow">
        <h4 className="font-semibold">Who to follow</h4>
        <div className="mt-3 space-y-3">
          {suggestions.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-gray-500">@{user.username}</div>
              </div>
              <button
                onClick={() => handleFollow(user.id)}
                className={`text-sm px-3 py-1 rounded-md transition ${
                  followed[user.id]
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {followed[user.id] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Notifications items={notifications} />
    </div>
  );
}
