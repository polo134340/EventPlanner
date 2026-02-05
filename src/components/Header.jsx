import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <span className="badge">📅</span>
          <span>Event Planner</span>
        </div>

        <nav className="nav">
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                Dashboard
              </NavLink>
              <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}>
                Add Event
              </NavLink>
              <NavLink to="/help" className={({ isActive }) => (isActive ? "active" : "")}>
                Help
              </NavLink>
              <span className="small">Hi, {currentUser?.name}</span>
              <button className="btn" onClick={handleLogout} type="button">
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                Register
              </NavLink>
              <NavLink to="/help" className={({ isActive }) => (isActive ? "active" : "")}>
                Help
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
