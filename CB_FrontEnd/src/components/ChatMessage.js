export default function ChatMessage({ message, sender }) {
  const isBot = sender === "bot";
  return (
    <div className={`msg-row ${isBot ? "bot" : "user"}`}>
      {isBot && <img src="/bot.png" className="avatar" alt="Doraemon" />}
      <div className="bubble">{message}</div>
    </div>
  );
}
