import Notifications from "../components/Notifications.jsx";

const DUMMY = [
  { id: 1, text: "Riya liked your post", time: "3h", icon: "❤️" },
  { id: 2, text: "Karan started following you", time: "1d", icon: "👥" },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Notifications items={DUMMY} />
    </div>
  );
}
