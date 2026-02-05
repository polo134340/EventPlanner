
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const EventsContext = createContext(null);

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
}

function sortByDateTimeAsc(a, b) {
  const ad = new Date(`${a.date}T${a.time || "00:00"}`).getTime();
  const bd = new Date(`${b.date}T${b.time || "00:00"}`).getTime();
  return ad - bd;
}

export function EventsProvider({ children }) {
  const { currentUser } = useAuth();

  // Store ALL events in localStorage; filter per user.
  const [allEvents, setAllEvents] = useState(() => safeJsonParse(localStorage.getItem("capstone_events_v1"), []));

  useEffect(() => {
    localStorage.setItem("capstone_events_v1", JSON.stringify(allEvents));
  }, [allEvents]);

  const userEvents = useMemo(() => {
    if (!currentUser) return [];
    return allEvents
      .filter((e) => e.userId === currentUser.id)
      .slice()
      .sort(sortByDateTimeAsc);
  }, [allEvents, currentUser]);

  function validateEvent(payload) {
    const name = (payload.name ?? "").trim();
    const date = (payload.date ?? "").trim();
    const time = (payload.time ?? "").trim();
    const description = (payload.description ?? "").trim();
    const location = (payload.location ?? "").trim();

    if (!name || !date) {
      return { ok: false, message: "Event name and date are required." };
    }
    // Optional time, description, location - but allowed empty.
    return { ok: true, cleaned: { name, date, time, description, location } };
  }

  function addEvent(payload) {
    if (!currentUser) return { ok: false, message: "You must be logged in." };

    const v = validateEvent(payload);
    if (!v.ok) return v;

    const newEvent = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      ...v.cleaned,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setAllEvents((prev) => [newEvent, ...prev]);
    return { ok: true };
  }

  function updateEvent(eventId, payload) {
    if (!currentUser) return { ok: false, message: "You must be logged in." };

    const v = validateEvent(payload);
    if (!v.ok) return v;

    setAllEvents((prev) =>
      prev.map((e) => {
        if (e.id !== eventId) return e;
        if (e.userId !== currentUser.id) return e;
        return { ...e, ...v.cleaned, updatedAt: new Date().toISOString() };
      })
    );

    return { ok: true };
  }

  function deleteEvent(eventId) {
    if (!currentUser) return;
    setAllEvents((prev) => prev.filter((e) => !(e.id === eventId && e.userId === currentUser.id)));
  }

  function getEventById(eventId) {
    if (!currentUser) return null;
    return allEvents.find((e) => e.id === eventId && e.userId === currentUser.id) ?? null;
  }

  const value = useMemo(
    () => ({
      userEvents,
      addEvent,
      updateEvent,
      deleteEvent,
      getEventById
    }),
    [userEvents, allEvents, currentUser]
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used within EventsProvider");
  return ctx;
}
