import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, authError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ok = login(form);
    if (ok) navigate("/dashboard");
  }

  return (
    <div className="grid two">
      <section className="card">
        <h1>Login</h1>
        <p>Access your dashboard to manage your events.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" value={form.username} onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />

          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn primary" type="submit">Login</button>
            <Link className="btn" to="/register">Create account</Link>
          </div>

          {authError ? <div className="alert error">{authError}</div> : null}
        </form>
      </section>

      <aside className="card">
        <h2>Tip</h2>
        <p>
          If you’re new here, register first. Your events are saved locally in your browser
          so you can refresh the page without losing them.
        </p>
        <p className="small">
          (For a real production app, you’d use a backend + hashed passwords.)
        </p>
      </aside>
    </div>
  );
}
