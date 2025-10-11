import Feed from "./Feed.jsx";
import RightSidebar from "../Pages/RightSidebar.jsx";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Feed />
      </div>

      <aside className="hidden lg:block">
        <RightSidebar />
      </aside>
    </div>
  );
}
