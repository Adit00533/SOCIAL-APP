export default function Notifications({ items = [] }) {
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
        }}
      >
        Notifications
      </h3>
      
      <div className="space-y-3">
        {items.map(i => (
          <div 
            key={i.id} 
            className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:translate-x-2 cursor-pointer"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)";
              e.currentTarget.style.borderColor = "rgba(102, 126, 234, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
            }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
              }}
            >
              {i.icon || '🔔'}
            </div>
            
            <div className="flex-1 min-w-0">
              <div 
                className="text-sm font-medium"
                style={{ color: "#e4e4e7" }}
              >
                {i.text}
              </div>
              <div 
                className="text-xs mt-1"
                style={{ color: "#a1a1aa" }}
              >
                {i.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}