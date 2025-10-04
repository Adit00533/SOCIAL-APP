import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState(user); // default to logged-in user

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !token) return;

      try {
        const res = await fetch(`/api/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          console.error("Failed to fetch profile:", data.message);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user, token]);

  if (!user) return <div className="p-6">Please login</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold">@{profile?.username}</h2>
      <p className="mt-2">Name: {profile?.name || "N/A"}</p>
      <p>Email: {profile?.email}</p>
    </div>
  );
}
