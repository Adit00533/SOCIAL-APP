import { useState, useRef, useEffect } from "react";

const users = ["Riya", "Karan", "Neha"];

function Message({ from, text }) {
  const isUser = from === "You";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg break-words ${
          isUser ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default function ChatBox() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [input, setInput] = useState("");

  // Store messages per user
  const [messages, setMessages] = useState({
    Riya: [
      { from: "Riya", text: "Hey there 👋" },
      { from: "You", text: "Hi! How are you?" },
    ],
    Karan: [],
    Neha: [],
  });

  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { from: "You", text: input.trim() };
    setMessages((prev) => ({
      ...prev,
      [selectedUser]: [...prev[selectedUser], newMessage],
    }));

    setInput("");
  };

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex bg-white shadow-lg rounded-lg max-w-4xl mx-auto h-[500px]">
      {/* Sidebar */}
      <aside className="w-40 border-r bg-gray-50 p-4">
        <h3 className="font-semibold mb-4">Chats</h3>
        {users.map((user) => (
          <div
            key={user}
            onClick={() => setSelectedUser(user)}
            className={`cursor-pointer px-3 py-2 rounded mb-2 hover:bg-indigo-100 ${
              selectedUser === user ? "bg-indigo-200 font-semibold" : ""
            }`}
          >
            {user}
          </div>
        ))}
      </aside>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 p-6">
        <h2 className="font-semibold mb-4 text-center text-xl">
          Chat with {selectedUser}
        </h2>

        <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-1">
          {(messages[selectedUser] || []).map((msg, idx) => (
            <Message key={idx} from={msg.from} text={msg.text} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${selectedUser}...`}
            className="flex-1 border rounded-md p-2 resize-none focus:outline-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md disabled:bg-indigo-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
