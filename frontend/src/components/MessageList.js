import React from "react";

export default function MessageList({ messages }) {
  return (
    <div>
      {messages.map((m) => (
        <p key={m._id}><b>{m.user.name}:</b> {m.text}</p>
      ))}
    </div>
  );
}
