export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <img src="/bot.png" alt="Doraemon" className="auth-avatar" />
        <h1>{title}</h1>
        <p className="auth-sub">{subtitle}</p>
        {children}
        <p className="auth-footer">{footer}</p>
      </div>
    </div>
  );
}
