import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card">
      <h1>404</h1>
      <p>That page doesn’t exist.</p>
      <Link className="btn" to="/dashboard">Go to dashboard</Link>
    </div>
  );
}
