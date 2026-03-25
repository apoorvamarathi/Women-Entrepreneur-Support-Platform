import { useState, useEffect } from "react";
import api from "../services/api";
import useAuthStore from "../store/useAuthStore";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    speaker: ""
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to load events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", formData);
      alert("Event created successfully!");
      setShowModal(false);
      setFormData({ title: "", description: "", date: "", time: "", speaker: "" });
      fetchEvents();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create event");
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await api.post(`/events/${eventId}/register`);
      
      // Update state immediately without reloading
      setEvents(events.map(event => {
        if (event.id === eventId) {
          return { ...event, registeredUsers: [...(event.registeredUsers || []), user.id || user._id] };
        }
        return event;
      }));
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to register for event");
    }
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1 className="page-title">Events & Webinars</h1>
        {isAdmin && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + Create Event
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <div className="card no-data">
          <p>No upcoming events scheduled.</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card card" key={event.id}>
              <div className="event-date-badge">
                <span className="month">{event.date.split(" ")[0] || "TBA"}</span>
                <span className="day">{event.date.split(" ")[1] || ""}</span>
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p className="speaker">👤 Speaker: {event.speaker || "Platform Expert"}</p>
                <p className="time">⏱️ Time: {event.time || "TBA"}</p>
                <p className="desc">{event.description}</p>
                
                {!isAdmin && (() => {
                  const isRegistered = event.registeredUsers?.includes(user?.id || user?._id);
                  return (
                    <button 
                      className={`btn-primary register-btn ${isRegistered ? "registered" : ""}`} 
                      onClick={() => !isRegistered && handleRegister(event.id)}
                      disabled={isRegistered}
                    >
                      {isRegistered ? "Registered" : "Register Now"}
                    </button>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && isAdmin && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <h2>Create New Event</h2>
            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  className="input-field"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  className="input-field"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    className="input-field"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    className="input-field"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Speaker Name</label>
                <input
                  type="text"
                  name="speaker"
                  className="input-field"
                  value={formData.speaker}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;