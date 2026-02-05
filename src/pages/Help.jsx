import React from "react";

export default function Help() {
  return (
    <div className="grid">
      <section className="card">
        <h1>Help</h1>
        <p>
          This app helps you organise personal or professional events like appointments,
          meetings, deadlines, and social plans.
        </p>

        <h2>Navigation</h2>
        <p>
          The header stays fixed at the top and includes links to:
          <b> Dashboard</b>, <b>Add Event</b>, and <b>Help</b>.
        </p>

        <h2>Register</h2>
        <p>
          Go to <b>Register</b> and enter your name, email, username, and password.
          The form checks that fields are not empty and that the email format is valid.
        </p>

        <h2>Login</h2>
        <p>
          After registering, use <b>Login</b> to access your dashboard.
        </p>

        <h2>Create an event</h2>
        <p>
          Use <b>Add Event</b> and enter an event name and date (required).
          You can also include time, location, and description.
        </p>

        <h2>Edit or delete</h2>
        <p>
          On the dashboard, use <b>Edit</b> to update details or <b>Delete</b> to remove an event.
          Changes update the app immediately.
        </p>

        <h2>Tips</h2>
        <ul className="small">
          <li>Use clear event names (e.g., “Doctor appointment” instead of “Thing”).</li>
          <li>Add locations for travel prep (e.g., “Zoom” or “Office”).</li>
          <li>Use descriptions for agendas, notes, or checklists.</li>
        </ul>
      </section>
    </div>
  );
}
