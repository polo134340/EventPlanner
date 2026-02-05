import React from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext.jsx";
import EventForm from "../components/EventForm.jsx";

export default function AddEvent() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleSubmit(form) {
    const result = addEvent(form);
    if (result.ok) {
      // Navigate after a short tick so success message can briefly appear if desired
      setTimeout(() => navigate("/dashboard"), 150);
    }
    return result;
  }

  return (
    <div className="grid">
      <EventForm onSubmit={handleSubmit} submitText="Add event" />
    </div>
  );
}
