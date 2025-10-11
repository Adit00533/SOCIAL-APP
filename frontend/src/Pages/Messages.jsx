import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

export default function Messages() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Assuming Navbar is fixed height */}
      <Navbar />

      {/* Content area */}
      <main className="flex-grow pt-20 max-w-3xl mx-auto w-full px-4 sm:px-6">
        <ChatBox />
      </main>
    </div>
  );
}
