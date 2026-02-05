import React, { useMemo } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useEvents } from "../context/EventsContext.jsx";
import EventList from "../components/EventList.jsx";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { userEvents, deleteEvent } = useEvents();

  const stats = useMemo(() => {
    const now = Date.now();
    const upcoming = userEvents.filter((e) => new Date(`${e.date}T${e.time || "00:00"}`).getTime() >= now).length;
    return { total: userEvents.length, upcoming };
  }, [userEvents]);

  return (
    <div className="grid two">
      <section>
        <EventList events={userEvents} onDelete={deleteEvent} />
      </section>

      <aside className="card">
        <h2>Welcome, {currentUser?.name}</h2>
        <p>Here’s a quick overview of your schedule.</p>

        <div className="grid" style={{ marginTop: 12 }}>
          <div className="event">
            <div className="event-title">Total events</div>
            <div className="event-meta">{stats.total}</div>
          </div>
          <div className="event">
            <div className="event-title">Upcoming events</div>
            <div className="event-meta">{stats.upcoming}</div>
          </div>
        </div>

        <div className="alert" style={{ marginTop: 12 }}>
          Use <b>Add Event</b> to schedule something new. Use <b>Edit</b> to update details.
        </div>
      </aside>
    </div>
  );
}
