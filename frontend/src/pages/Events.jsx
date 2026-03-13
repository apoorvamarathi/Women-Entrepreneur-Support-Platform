import { useState, useEffect } from "react";
import api from "../services/api";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to load events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventId, eventTitle) => {
    try {
      await api.post(`/events/${eventId}/register`);
      alert(`You have successfully registered for: ${eventTitle}`);
      // Optionally refresh the events list or update the event in state
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to register for this event.");
    }
  };

  return (
    <div className="events-page">
      <h1 className="page-title">Events & Webinars</h1>

      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card card" key={event.id}>
            <h3>{event.title}</h3>
            <p className="speaker">Speaker: {event.speaker}</p>
            <p className="datetime">
              {event.date} at {event.time}
            </p>
            <p className="description">{event.description}</p>
            <button
              className="btn-primary"
              onClick={() => handleRegister(event._id || event.id, event.title)}
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;