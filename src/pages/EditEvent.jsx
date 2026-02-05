import React, { useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext.jsx";
import EventForm from "../components/EventForm.jsx";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, updateEvent } = useEvents();

  const event = useMemo(() => getEventById(id), [getEventById, id]);

  function handleSubmit(form) {
    const result = updateEvent(id, form);
    if (result.ok) {
      setTimeout(() => navigate("/dashboard"), 150);
    }
    return result;
  }

  if (!event) {
    return (
      <div className="card">
        <h1>Event not found</h1>
        <p>This event might have been deleted, or the link is incorrect.</p>
        <Link className="btn" to="/dashboard">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="grid">
      <EventForm initialValues={event} onSubmit={handleSubmit} submitText="Update event" />
    </div>
  );
}
