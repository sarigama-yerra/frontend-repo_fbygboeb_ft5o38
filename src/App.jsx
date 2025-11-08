import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome! I'm your on-device AI assistant. Ask a question, request a summary, or say 'write a haiku about the ocean'.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const historyPayload = useMemo(
    () => messages.map(({ role, content }) => ({ role, content })),
    [messages]
  );

  const sendMessage = async (text) => {
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const resp = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyPayload }),
      });
      if (!resp.ok) throw new Error("Request failed");
      const data = await resp.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't reach the server. Please ensure the backend is running and the URL is configured.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional: connectivity check
    fetch(`${BACKEND_URL}/api/hello`).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-6 h-[calc(100vh-64px-120px)] flex flex-col">
          <ChatWindow messages={messages} />
          <div className="border-t border-slate-200 pt-4">
            <ChatInput onSend={sendMessage} isLoading={loading} />
            <p className="text-[11px] text-slate-500 mt-2">
              Tip: Try prompts like "summarize your last reply", "paraphrase this email:", or "tell me a joke".
            </p>
          </div>
        </div>
      </main>

      <footer className="px-4 py-3 text-center text-xs text-slate-500">
        Built with love. No external AI services required.
      </footer>
    </div>
  );
}
