// import React, { useState, useEffect } from "react";
// import { getMessages, sendMessage } from "../api/api";
// import MessageList from "../components/MessageList";

// export default function Messages() {
//   const conversationId = "general"; // Example, change per conversation
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");

//   const fetchMessages = async () => {
//     const res = await getMessages(conversationId);
//     setMessages(res.data);
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const handleSend = async () => {
//     if (!text) return;
//     await sendMessage(conversationId, text);
//     setText("");
//     fetchMessages();
//   };

//   return (
//     <div>
//       <MessageList messages={messages} />
//       <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   );
// }
