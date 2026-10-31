import React from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = React.useState("");
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!disabled) ref.current?.focus();
  }, [disabled]);

  function submit(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value || disabled) return;
    onSend(value);
    setText("");
  }

  return (
    <form className="composer" onSubmit={submit}>
      <input
        ref={ref}
        value={text}
        maxLength={1000}
        placeholder="Ask Doraemon about a gadget..."
        onChange={(e) => setText(e.target.value)}
        aria-label="Message"
      />
      <button type="submit" disabled={!text.trim() || disabled} aria-label="Send">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </button>
    </form>
  );
}
