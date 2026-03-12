import { useState } from "react";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Startup Pitch Event",
      speaker: "CEO XYZ",
      date: "May 20, 2025",
      time: "3:00 PM",
      description: "Pitch your startup to a panel of investors and get feedback.",
    },
    {
      id: 2,
      title: "Webinar: Fundraising 101",
      speaker: "Jane Investor",
      date: "May 25, 2025",
      time: "11:00 AM",
      description: "Learn the basics of fundraising, from angel investors to venture capital.",
    },
    {
      id: 3,
      title: "Workshop: Business Model Canvas",
      speaker: "Mentor Mike",
      date: "June 2, 2025",
      time: "1:00 PM",
      description: "Hands-on workshop to build your business model canvas.",
    },
    {
      id: 4,
      title: "Networking Mixer",
      speaker: "Various",
      date: "June 10, 2025",
      time: "6:00 PM",
      description: "Connect with fellow entrepreneurs, mentors, and investors.",
    },
  ]);

  const handleRegister = (eventTitle) => {
    alert(`You have registered for: ${eventTitle}`);
    // In a real app, you would call an API to register the user
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
              onClick={() => handleRegister(event.title)}
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