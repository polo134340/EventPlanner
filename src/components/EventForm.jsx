import React, { useMemo, useState } from "react";

export default function EventForm({ initialValues, onSubmit, submitText = "Save" }) {
  const init = useMemo(
    () => ({
      name: initialValues?.name ?? "",
      date: initialValues?.date ?? "",
      time: initialValues?.time ?? "",
      location: initialValues?.location ?? "",
      description: initialValues?.description ?? ""
    }),
    [initialValues]
  );

  const [form, setForm] = useState(init);
  const [message, setMessage] = useState(null); // {type, text}

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    const result = onSubmit(form);
    if (!result?.ok) {
      setMessage({ type: "error", text: result?.message || "Please check your input." });
      return;
    }
    setMessage({ type: "success", text: "Saved successfully." });
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>{submitText}</h2>
      <p>Add details for your event. Event name and date are required.</p>

      <label htmlFor="name">Event name *</label>
      <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="e.g., Team meeting" />

      <div className="row">
        <div style={{ flex: 1, minWidth: 220 }}>
          <label htmlFor="date">Date *</label>
          <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label htmlFor="time">Time</label>
          <input id="time" name="time" type="time" value={form.time} onChange={handleChange} />
        </div>
      </div>

      <label htmlFor="location">Location</label>
      <input
        id="location"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="e.g., Office / Zoom / Home"
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Notes, agenda, prep, etc."
      />

      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn primary" type="submit">
          {submitText}
        </button>
      </div>

      {message && <div className={`alert ${message.type}`}>{message.text}</div>}
    </form>
  );
}
