export default function PostCard({ post }) {
  return (
    <div className="border rounded-lg p-4 mb-3 shadow-sm">
      <h3 className="font-bold">@{post.user.username}</h3>
      <p className="mt-2">{post.content}</p>
      <div className="text-sm text-gray-500 mt-2">
        {new Date(post.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
