import { useState } from "react";

export default function FollowButton({ initial = false }) {
  const [isFollowing, setIsFollowing] = useState(initial);

  return (
    <button
      onClick={() => setIsFollowing(!isFollowing)}
      className={`px-4 py-2 rounded-md text-sm ${
        isFollowing ? 'bg-gray-200 text-gray-800' : 'bg-primary text-white'
      }`}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}
