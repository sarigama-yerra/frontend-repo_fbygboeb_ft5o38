export default function ChatMessage({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
          isUser
            ? "bg-indigo-600 text-white rounded-tr-sm"
            : "bg-white text-slate-800 border border-slate-200 rounded-tl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
