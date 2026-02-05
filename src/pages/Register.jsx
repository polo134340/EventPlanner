import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register, authError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ok = register(form);
    if (ok) navigate("/dashboard");
  }

  return (
    <div className="grid two">
      <section className="card">
        <h1>Create an account</h1>
        <p>Enter your details to register. All fields are required.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" />

          <label htmlFor="username">Username</label>
          <input id="username" name="username" value={form.username} onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />

          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn primary" type="submit">Register</button>
            <Link className="btn" to="/login">Back to login</Link>
          </div>

          {authError ? <div className="alert error">{authError}</div> : null}
        </form>
      </section>

      <aside className="card">
        <h2>Validation rules</h2>
        <ul className="small">
          <li>All fields must be filled in</li>
          <li>Email must be in a valid format</li>
          <li>Username at least 3 characters</li>
          <li>Password at least 6 characters</li>
        </ul>
      </aside>
    </div>
  );
}
