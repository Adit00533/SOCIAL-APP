export default function StoryModal({ story, onClose }) {
  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-[90vw] max-h-[90vh] w-full sm:w-[350px]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/70 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/90 transition"
          aria-label="Close Story"
        >
          ✕
        </button>

        <img
          src={story.img}
          alt={`${story.name}'s story`}
          className="rounded-xl w-full h-[450px] object-cover mx-auto"
        />

        <p className="text-white text-lg font-semibold mt-4 text-center">
          {story.name}'s Story
        </p>
      </div>
    </div>
  );
}
