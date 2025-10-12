import Notifications from "../components/Notifications.jsx";

const DUMMY = [
  { id: 1, text: "Riya liked your post", time: "3h", icon: "❤️" },
  { id: 2, text: "Karan started following you", time: "1d", icon: "👥" },
];

export default function NotificationsPage() {
  return (
    <div 
      className="min-h-screen py-6 px-4"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div 
          className="mb-6 p-6 rounded-2xl shadow-2xl"
          style={{
            background: "rgba(26, 26, 46, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <h1 
            className="text-3xl font-bold"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 2px 10px rgba(124, 58, 237, 0.3)",
            }}
          >
            Notifications
          </h1>
          <p 
            className="mt-2 text-sm"
            style={{ color: "#a1a1aa" }}
          >
            Stay updated with your latest activity
          </p>
        </div>

        {/* Notifications Component */}
        <Notifications items={DUMMY} />
      </div>
    </div>
  );
}