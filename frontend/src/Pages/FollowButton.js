import { followUser, unfollowUser } from "../api/api";

export default function FollowButton({ userId, isFollowing, onUpdate }) {
  const handleClick = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      onUpdate(); // refresh UI
    } catch (err) {
      console.error("Follow error:", err);
    }
  };

  return (
    <button
      className="bg-blue-500 text-white px-3 py-1 rounded"
      onClick={handleClick}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
