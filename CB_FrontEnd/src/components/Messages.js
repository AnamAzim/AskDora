import React from "react";
import ChatMessage from "./ChatMessage";

const SUGGESTIONS = [
  "What is the Anywhere Door?",
  "I have an exam tomorrow",
  "I want to fly",
  "Who is Shizuka?",
  "What's your favourite food?",
  "Tell me a joke"
];

export default function Messages({ messages, typing, loading, onSuggest, name }) {
  const endRef = React.useRef(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  if (loading) {
    return <div className="messages"><div className="messages-inner"><div className="skeleton" /><div className="skeleton short" /></div></div>;
  }

  if (messages.length === 0) {
    return (
      <div className="messages empty">
        <img src="/bot.png" alt="Doraemon" className="hero-avatar" />
        <h2>Hi {name}, I'm Doraemon!</h2>
        <p>Ask me about my gadgets from the 4D Pocket.</p>
        <div className="chips">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="chip" onClick={() => onSuggest(s)}>{s}</button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="messages">
      <div className="messages-inner">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m.message} sender={m.sender} />
        ))}
        {typing && (
          <div className="msg-row bot">
            <img src="/bot.png" className="avatar" alt="" />
            <div className="bubble typing" aria-label="Doraemon is typing"><span /><span /><span /></div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
