import React, { useEffect, useState } from "react";
import { getNotifications } from "../api/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications();
      setNotifications(res.data);
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.map((n) => (
        <p key={n._id}>{n.text}</p>
      ))}
    </div>
  );
}
