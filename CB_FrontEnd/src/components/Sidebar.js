import React from "react";
import { useAuth } from "../context/AuthContext";

function timeLabel(iso) {
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export default function Sidebar({ chats, activeId, loading, open, onClose, onNew, onSelect, onDelete, onRename }) {
  const { user, logout } = useAuth();
  const [editingId, setEditingId] = React.useState(null);
  const [draft, setDraft] = React.useState("");
  const [confirmId, setConfirmId] = React.useState(null);

  function startRename(chat) {
    setEditingId(chat._id);
    setDraft(chat.title);
    setConfirmId(null);
  }

  function finishRename(chat) {
    const t = draft.trim();
    if (t && t !== chat.title) onRename(chat._id, t);
    setEditingId(null);
  }

  return (
    <>
      <div className={`scrim ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <img src="/bot.png" alt="" />
          <span>AskDora</span>
        </div>

        <button className="new-chat" onClick={onNew}>
          <span>+</span> New chat
        </button>

        <div className="list-label">Your chats</div>
        <nav className="chat-list">
          {loading && <div className="list-empty">Loading...</div>}
          {!loading && chats.length === 0 && (
            <div className="list-empty">No chats yet. Say hi to Doraemon!</div>
          )}
          {chats.map((chat) => (
            <div key={chat._id} className={`chat-item ${chat._id === activeId ? "active" : ""}`}>
              {editingId === chat._id ? (
                <input
                  className="rename"
                  autoFocus
                  value={draft}
                  maxLength={80}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={() => finishRename(chat)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") finishRename(chat);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                />
              ) : confirmId === chat._id ? (
                <div className="confirm">
                  <span>Delete?</span>
                  <button className="danger" onClick={() => { setConfirmId(null); onDelete(chat._id); }}>Yes</button>
                  <button onClick={() => setConfirmId(null)}>No</button>
                </div>
              ) : (
                <>
                  <button className="chat-main" onClick={() => onSelect(chat._id)}>
                    <span className="chat-title">{chat.title}</span>
                    <span className="chat-date">{timeLabel(chat.updatedAt)}</span>
                  </button>
                  <div className="chat-actions">
                    <button title="Rename" aria-label="Rename chat" onClick={() => startRename(chat)}>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>
                    </button>
                    <button title="Delete" aria-label="Delete chat" onClick={() => setConfirmId(chat._id)}>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M6 6l1 14h10l1-14" /></svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>

        <div className="user-box">
          <div className="user-avatar">{(user?.username || "?")[0].toUpperCase()}</div>
          <div className="user-meta">
            <strong>{user?.username}</strong>
            <span>{user?.email}</span>
          </div>
          <button className="logout" onClick={logout} title="Log out" aria-label="Log out">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>
          </button>
        </div>
      </aside>
    </>
  );
}
