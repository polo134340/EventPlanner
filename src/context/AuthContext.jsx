import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const LS_USERS = "capstone_users_v1";
const LS_SESSION = "capstone_session_v1";

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
}

function isValidEmail(email) {
  // Simple, practical email pattern
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => safeJsonParse(localStorage.getItem(LS_USERS), []));
  const [session, setSession] = useState(() => safeJsonParse(localStorage.getItem(LS_SESSION), null));
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    localStorage.setItem(LS_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(LS_SESSION, JSON.stringify(session));
  }, [session]);

  const currentUser = useMemo(() => {
    if (!session?.username) return null;
    return users.find((u) => u.username === session.username) ?? null;
  }, [session, users]);

  function register({ name, email, username, password }) {
    setAuthError("");

    const cleanName = (name ?? "").trim();
    const cleanEmail = (email ?? "").trim();
    const cleanUsername = (username ?? "").trim();
    const cleanPassword = (password ?? "").trim();

    if (!cleanName || !cleanEmail || !cleanUsername || !cleanPassword) {
      setAuthError("All fields are required.");
      return false;
    }
    if (!isValidEmail(cleanEmail)) {
      setAuthError("Please enter a valid email address.");
      return false;
    }
    if (cleanUsername.length < 3) {
      setAuthError("Username must be at least 3 characters.");
      return false;
    }
    if (cleanPassword.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return false;
    }

    const usernameTaken = users.some((u) => u.username.toLowerCase() === cleanUsername.toLowerCase());
    if (usernameTaken) {
      setAuthError("That username is already taken.");
      return false;
    }

    const emailTaken = users.some((u) => u.email.toLowerCase() === cleanEmail.toLowerCase());
    if (emailTaken) {
      setAuthError("That email is already registered.");
      return false;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: cleanName,
      email: cleanEmail,
      username: cleanUsername,
      // For a capstone: storing plaintext is acceptable, but note it's not secure for real apps.
      password: cleanPassword,
      createdAt: new Date().toISOString()
    };

    setUsers((prev) => [newUser, ...prev]);
    setSession({ username: newUser.username, loggedInAt: new Date().toISOString() });
    return true;
  }

  function login({ username, password }) {
    setAuthError("");

    const cleanUsername = (username ?? "").trim();
    const cleanPassword = (password ?? "").trim();

    if (!cleanUsername || !cleanPassword) {
      setAuthError("Please enter your username and password.");
      return false;
    }

    const found = users.find(
      (u) => u.username.toLowerCase() === cleanUsername.toLowerCase() && u.password === cleanPassword
    );

    if (!found) {
      setAuthError("Invalid username or password.");
      return false;
    }

    setSession({ username: found.username, loggedInAt: new Date().toISOString() });
    return true;
  }

  function logout() {
    setAuthError("");
    setSession(null);
  }

  const value = useMemo(
    () => ({
      users,
      currentUser,
      isLoggedIn: Boolean(currentUser),
      authError,
      register,
      login,
      logout
    }),
    [users, currentUser, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
