import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

export default function Messages() {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        backgroundAttachment: "fixed",
      }}
    >
   
      <Navbar />

      {/* Content area */}
      <main className="flex-grow pt-20 max-w-3xl mx-auto w-full px-4 sm:px-6 pb-8">
        <ChatBox />
      </main>
    </div>
  );
}