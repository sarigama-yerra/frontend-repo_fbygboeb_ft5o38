import { useState, useRef, useEffect } from "react";
import { Send, ArrowUp, Loader2 } from "lucide-react";

export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = value.trim();
    if (!msg) return;
    onSend(msg);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-end gap-2">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          rows={1}
          maxLength={4000}
          placeholder="Ask anything…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="absolute right-2 bottom-2 text-slate-400">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50"
        disabled={isLoading}
        aria-label="Send"
      >
        <Send className="h-4 w-4" />
        Send
      </button>
    </form>
  );
}
