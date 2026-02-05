import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function toDateTime(event) {
  return new Date(`${event.date}T${event.time || "00:00"}`);
}

export default function EventList({ events, onDelete }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("upcoming"); // upcoming | all

  const filtered = useMemo(() => {
    const now = Date.now();
    const q = query.trim().toLowerCase();

    let list = events;

    if (mode === "upcoming") {
      list = list.filter((e) => toDateTime(e).getTime() >= now - 60_000);
    }

    if (q) {
      list = list.filter((e) => {
        const hay = `${e.name} ${e.location ?? ""} ${e.description ?? ""}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return list;
  }, [events, query, mode]);

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h2>Your events</h2>
          <p>Search, edit, or delete your events. The view updates instantly.</p>
        </div>
        <Link className="btn primary" to="/add">
          + Add event
        </Link>
      </div>

      <div className="row" style={{ marginTop: 8 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, location, or description…"
          aria-label="Search events"
          style={{ flex: 1, minWidth: 240 }}
        />
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ width: 180 }}>
          <option value="upcoming">Upcoming</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="grid" style={{ marginTop: 14 }}>
        {filtered.length === 0 ? (
          <div className="alert">
            No events found. Try “All” or add a new event.
          </div>
        ) : (
          filtered.map((e) => (
            <div key={e.id} className="event">
              <div className="event-top">
                <div className="event-title">{e.name}</div>
                <div className="event-meta">
                  {e.date}
                  {e.time ? ` • ${e.time}` : ""} {e.location ? ` • ${e.location}` : ""}
                </div>
              </div>

              {e.description ? <div className="event-meta">{e.description}</div> : null}

              <div className="event-actions">
                <Link className="btn" to={`/edit/${e.id}`}>
                  Edit
                </Link>
                <button
                  className="btn danger"
                  type="button"
                  onClick={() => {
                    const ok = window.confirm(`Delete "${e.name}"?`);
                    if (ok) onDelete(e.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
