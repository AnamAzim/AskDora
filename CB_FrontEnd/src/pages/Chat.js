import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, uid } from "../api";
import { useAuth } from "../context/AuthContext";
import getResponse from "../data/responses";
import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";
import ChatInput from "../components/ChatInput";

const sortChats = (list) =>
  [...list].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : "friend";

  const [chats, setChats] = React.useState([]);
  const [listLoading, setListLoading] = React.useState(true);
  const [messages, setMessages] = React.useState([]);
  const [chatLoading, setChatLoading] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [notice, setNotice] = React.useState("");

  const activeIdRef = React.useRef(id || null);
  const skipLoadFor = React.useRef(null); // chat we just created locally - already have its messages
  activeIdRef.current = id || null;

  const flash = (text) => {
    setNotice(text);
    setTimeout(() => setNotice(""), 3500);
  };

  // Sidebar list
  React.useEffect(() => {
    api("/chats")
      .then((d) => setChats(d.chats))
      .catch(() => flash("Could not load your chats"))
      .finally(() => setListLoading(false));
  }, []);

  // Load the selected chat (this is what lets you continue an old conversation)
  React.useEffect(() => {
    setTyping(false);
    if (!id) {
      setMessages([]);
      return;
    }
    if (skipLoadFor.current === id) {
      skipLoadFor.current = null;
      return;
    }
    let cancelled = false;
    setChatLoading(true);
    api(`/chats/${id}`)
      .then((d) => !cancelled && setMessages(d.chat.messages))
      .catch(() => {
        if (!cancelled) {
          flash("That chat could not be found");
          navigate("/chat", { replace: true });
        }
      })
      .finally(() => !cancelled && setChatLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  function upsertChat(chat) {
    setChats((prev) =>
      sortChats([
        { _id: chat._id, title: chat.title, updatedAt: chat.updatedAt, createdAt: chat.createdAt },
        ...prev.filter((c) => c._id !== chat._id)
      ])
    );
  }

  async function handleSend(text) {
    const before = messages;
    const userMsg = { id: uid(), sender: "user", message: text };
    const botMsg = { id: uid(), sender: "bot", message: getResponse(text, { name: displayName, history: before }) };

    setMessages([...before, userMsg]);
    setTyping(true);

    const startedIn = activeIdRef.current;
    const delay = new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    try {
      // Save user + bot message immediately so nothing is lost if the tab closes
      const full = [...before, userMsg, botMsg];
      let saved;
      if (startedIn) {
        saved = (await api(`/chats/${startedIn}`, { method: "PUT", body: { messages: full } })).chat;
      } else {
        const title = text.length > 40 ? `${text.slice(0, 40)}...` : text;
        saved = (await api("/chats", { method: "POST", body: { title, messages: full } })).chat;
      }
      upsertChat(saved);
      await delay;

      if (!startedIn) {
        skipLoadFor.current = saved._id;
        navigate(`/chat/${saved._id}`, { replace: true });
        activeIdRef.current = saved._id;
        setMessages(full);
        setTyping(false);
      } else if (activeIdRef.current === startedIn) {
        setMessages(full);
        setTyping(false);
      }
    } catch (err) {
      setTyping(false);
      if (err.status === 401) return navigate("/login");
      setMessages(before);
      flash("Message could not be saved. Please try again.");
    }
  }

  async function handleDelete(chatId) {
    try {
      await api(`/chats/${chatId}`, { method: "DELETE" });
      setChats((prev) => prev.filter((c) => c._id !== chatId));
      if (chatId === id) navigate("/chat");
    } catch {
      flash("Could not delete that chat");
    }
  }

  async function handleRename(chatId, title) {
    const previous = chats;
    setChats((prev) => prev.map((c) => (c._id === chatId ? { ...c, title } : c)));
    try {
      await api(`/chats/${chatId}`, { method: "PATCH", body: { title } });
    } catch {
      setChats(previous);
      flash("Could not rename that chat");
    }
  }

  const go = (to) => {
    setSidebarOpen(false);
    navigate(to);
  };

  const title = chats.find((c) => c._id === id)?.title || "New chat";

  return (
    <div className="shell">
      <Sidebar
        chats={chats}
        activeId={id}
        loading={listLoading}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNew={() => go("/chat")}
        onSelect={(chatId) => go(`/chat/${chatId}`)}
        onDelete={handleDelete}
        onRename={handleRename}
      />

      <main className="main">
        <header className="topbar">
          <button className="menu" onClick={() => setSidebarOpen(true)} aria-label="Open chats">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
          <h1>{title}</h1>
        </header>

        <Messages messages={messages} typing={typing} loading={chatLoading} onSuggest={handleSend} name={displayName} />

        {notice && <div className="toast" role="status">{notice}</div>}

        <ChatInput onSend={handleSend} disabled={typing || chatLoading} />
      </main>
    </div>
  );
}
