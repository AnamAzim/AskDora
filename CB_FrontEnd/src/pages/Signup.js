import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "./AuthLayout";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ username: "", email: "", password: "" });
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signup(form.username, form.email, form.password);
      navigate("/chat");
    } catch (err) {
      setError(err.status ? err.message : "Could not connect to server");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      title="Join AskDora"
      subtitle="Create an account so your chats are saved."
      footer={<>Already have an account? <Link to="/login">Log in</Link></>}
    >
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} autoComplete="username" required onChange={change} />
        <input name="email" type="email" placeholder="Email" value={form.email} autoComplete="email" required onChange={change} />
        <input name="password" type="password" placeholder="Password (min 6 characters)" minLength={6}
          value={form.password} autoComplete="new-password" required onChange={change} />
        {error && <p className="error" role="alert">{error}</p>}
        <button type="submit" disabled={busy}>{busy ? "Creating..." : "Create account"}</button>
      </form>
    </AuthLayout>
  );
}
