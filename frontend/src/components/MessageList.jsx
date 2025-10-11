export default function MessageList({ messages = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="font-semibold mb-3">Messages</h3>
      <div className="space-y-3">
        {messages.map(m => (
          <div key={m.id} className="flex items-start gap-3 border-b pb-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">{m.sender[0]}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="font-medium">{m.sender}</div>
                <div className="text-xs text-muted">{m.time}</div>
              </div>
              <div className="text-sm text-gray-700 mt-1">{m.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
