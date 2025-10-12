import Feed from "./Feed.jsx";
import RightSidebar from "../Pages/RightSidebar.jsx";

export default function Home() {
  return (
    <div 
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-6">
        <div className="lg:col-span-2">
          <Feed />
        </div>
        <aside className="hidden lg:block">
          <div 
            className="sticky top-24 rounded-2xl p-6 shadow-2xl transition-all duration-300"
            style={{
              background: "rgba(26, 26, 46, 0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <RightSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}