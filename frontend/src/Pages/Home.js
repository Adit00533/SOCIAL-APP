import React from "react";
import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
import Notifications from "../components/Notifications";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="main">
        <Feed />
        <Notifications />
      </div>
    </div>
  );
}
