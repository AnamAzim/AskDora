import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "./AuthLayout";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate("/chat");
    } catch (err) {
      setError(err.status ? err.message : "Could not connect to server");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Log in to continue your chats with Doraemon."
      footer={<>New here? <Link to="/signup">Create an account</Link></>}
    >
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} autoComplete="email" required
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} autoComplete="current-password" required
          onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error" role="alert">{error}</p>}
        <button type="submit" disabled={busy}>{busy ? "Logging in..." : "Log in"}</button>
      </form>
    </AuthLayout>
  );
}
