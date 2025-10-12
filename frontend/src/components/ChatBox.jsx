import { useState, useRef, useEffect } from "react";

const users = ["Riya", "Karan", "Neha"];

function Message({ from, text }) {
  const isUser = from === "You";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-xs px-4 py-3 rounded-2xl break-words shadow-lg transition-all duration-300 hover:scale-105 ${
          isUser
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100"
        }`}
        style={{
          boxShadow: isUser
            ? "0 4px 15px rgba(124, 58, 237, 0.4)"
            : "0 4px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default function ChatBox() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [input, setInput] = useState("");
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
    <div
      className="flex shadow-2xl rounded-2xl max-w-4xl mx-auto h-[500px] overflow-hidden"
      style={{
        background: "rgba(26, 26, 46, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Sidebar */}
      <aside
        className="w-48 p-4"
        style={{
          background: "rgba(15, 15, 30, 0.6)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h3 className="font-bold mb-4 text-lg bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Chats
        </h3>
        {users.map((user) => (
          <div
            key={user}
            onClick={() => setSelectedUser(user)}
            className={`cursor-pointer px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
              selectedUser === user
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold text-white shadow-lg"
                : "hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-indigo-600/20 text-gray-300"
            }`}
            style={
              selectedUser === user
                ? { boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)" }
                : {}
            }
          >
            {user}
          </div>
        ))}
      </aside>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 p-6">
        <h2
          className="font-bold mb-4 text-center text-2xl bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          style={{ textShadow: "0 2px 10px rgba(124, 58, 237, 0.3)" }}
        >
          Chat with {selectedUser}
        </h2>

        <div
          className="flex-1 overflow-y-auto mb-4 px-2 rounded-xl p-4"
          style={{
            background: "rgba(15, 15, 30, 0.4)",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(124, 58, 237, 0.5) rgba(255, 255, 255, 0.1)",
          }}
        >
          {(messages[selectedUser] || []).map((msg, idx) => (
            <Message key={idx} from={msg.from} text={msg.text} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${selectedUser}...`}
            className="flex-1 rounded-xl p-3 resize-none text-white placeholder-gray-400 transition-all duration-300 focus:outline-none"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.08)";
              e.target.style.borderColor = "#7c3aed";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(124, 58, 237, 0.2), inset 0 2px 10px rgba(0, 0, 0, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.boxShadow = "inset 0 2px 10px rgba(0, 0, 0, 0.2)";
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: input.trim()
                ? "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)"
                : "rgba(124, 58, 237, 0.3)",
              boxShadow: input.trim()
                ? "0 4px 15px rgba(124, 58, 237, 0.4)"
                : "none",
            }}
            onMouseEnter={(e) => {
              if (input.trim()) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(124, 58, 237, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = input.trim()
                ? "0 4px 15px rgba(124, 58, 237, 0.4)"
                : "none";
            }}
          >
            Send
          </button>
        </div>
      </div>

      <style>{`
        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(124, 58, 237, 0.5);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(124, 58, 237, 0.7);
        }
      `}</style>
    </div>
  );
}