export default function Notifications({ items = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="font-semibold mb-3">Notifications</h3>
      <div className="space-y-2">
        {items.map(i => (
          <div key={i.id} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm">{i.icon || '🔔'}</div>
            <div>
              <div className="text-sm text-gray-800">{i.text}</div>
              <div className="text-xs text-muted">{i.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
