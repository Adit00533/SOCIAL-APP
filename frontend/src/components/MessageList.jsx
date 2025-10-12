export default function MessageList({ messages = [] }) {
  return (
    <div 
      className="rounded-2xl shadow-2xl p-6"
      style={{
        background: "rgba(26, 26, 46, 0.7)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <h3 
        className="font-bold mb-4 text-xl"
        style={{
          background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "0 2px 10px rgba(124, 58, 237, 0.3)",
        }}
      >
        Messages
      </h3>
      <div className="space-y-3">
        {messages.map(m => (
          <div 
            key={m.id} 
            className="flex items-start gap-3 pb-3 transition-all duration-300 hover:translate-x-2"
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Avatar */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "2px solid rgba(102, 126, 234, 0.3)",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              }}
            >
              {m.sender[0]}
            </div>
            
            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center gap-2">
                <div 
                  className="font-semibold truncate"
                  style={{ color: "#e4e4e7" }}
                >
                  {m.sender}
                </div>
                <div 
                  className="text-xs whitespace-nowrap"
                  style={{ color: "#71717a" }}
                >
                  {m.time}
                </div>
              </div>
              <div 
                className="text-sm mt-1.5 line-clamp-2"
                style={{ color: "#a1a1aa" }}
              >
                {m.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}