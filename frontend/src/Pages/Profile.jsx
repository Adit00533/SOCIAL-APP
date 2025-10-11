import { useParams } from "react-router-dom";
import FollowButton from "../Pages/FollowButton.jsx";
import PostCard from "../components/PostCard.jsx";

const DUMMY_POSTS = [
  { id: 10, user: "Aditya V", handle: "@aditya", time: "1d", more: "", content: "Built a clean frontend today!", media: null, likes: 12, comments: 2 },
  { id: 11, user: "Aditya V", handle: "@aditya", time: "4d", more: "", content: "Learning advanced React patterns.", media: "https://picsum.photos/800/300?random=3", likes: 8, comments: 1 }
];

export default function Profile() {
  const { id } = useParams();

  const user = {
    id,
    username: "Aditya V",
    bio: "Frontend developer • React enthusiast",
    followers: 1024,
    following: 256,
    avatar: null
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold">{user.username[0]}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-sm text-muted mt-1">{user.bio}</p>
              <div className="text-sm text-muted mt-2">{user.followers} followers • {user.following} following</div>
            </div>
            <FollowButton initial={false} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {DUMMY_POSTS.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </div>
  );
}
