import { useState, useEffect } from "react";
import api from "../services/api";
import "./Mentorship.css";

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await api.get("/mentorship/mentors");
        setMentors(res.data);
      } catch (error) {
        console.error("Failed to fetch mentors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  // Session data (still mocked for UI structure until we build session endpoints)
  const upcomingSessions = [
    { id: 1, mentor: "Sarah Johnson", date: "May 25, 2025", time: "3:00 PM", topic: "Tech Startup Scaling" },
    { id: 2, mentor: "Priya Patel", date: "May 28, 2025", time: "11:00 AM", topic: "E-commerce Strategy" },
  ];

  const previousSessions = [
    { id: 3, mentor: "Maria Garcia", date: "May 10, 2025", time: "2:00 PM", topic: "Wellness Business Model" },
    { id: 4, mentor: "Lisa Chen", date: "May 5, 2025", time: "10:00 AM", topic: "Financial Projections" },
  ];

  // Handler for request mentorship
  const handleRequestMentorship = async (mentorId, mentorName) => {
    try {
      // Create a request for tomorrow as a default for now. 
      // A full implementation would likely open a modal to pick a date.
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      await api.post("/mentorship/request", {
        mentorId,
        sessionDate: tomorrow.toISOString(),
      });
      alert(`Mentorship request sent to ${mentorName}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to request mentorship.");
    }
  };

  // Filter mentors
  const filteredMentors = mentors.filter((mentor) => {
    // Note: mentor.userId might be populated with { name, email } based on the backend
    const mentorName = mentor.userId?.name || mentor.name || "Unknown Mentor";
    const matchesSearch =
      mentorName.toLowerCase().includes(search.toLowerCase()) ||
      (mentor.expertise || "").toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industryFilter === "" || (mentor.expertise && mentor.expertise.includes(industryFilter));
    const matchesExperience = experienceFilter === "" || (mentor.experience && mentor.experience.toString().includes(experienceFilter));
    return matchesSearch && matchesIndustry && matchesExperience;
  });

  // Unique industries for filter dropdown
  const industries = [...new Set(mentors.map((m) => m.expertise).filter(Boolean))];

  return (
    <div className="mentorship-page">
      <h1 className="page-title">Mentorship</h1>

      {/* Search and Filter Section */}
      <div className="filters-section">
        <input
          type="text"
          placeholder="Search mentors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field search-input"
        />
        <select
          className="input-field filter-select"
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
        >
          <option value="">All Industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
        <select
          className="input-field filter-select"
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
        >
          <option value="">All Experience</option>
          <option value="5">Less than 5 years</option>
          <option value="10">5-10 years</option>
          <option value="15">10+ years</option>
        </select>
        <button className="btn-primary">Find Mentors</button>
      </div>

      {/* Mentor Cards Grid */}
      <div className="mentor-grid">
        {filteredMentors.map((mentor) => (
          <div className="mentor-card card" key={mentor.id}>
            <div className="mentor-avatar">{mentor.avatar}</div>
            <h3>{mentor.name}</h3>
            <p className="expertise">{mentor.expertise}</p>
            <p className="experience">Experience: {mentor.experience}</p>
            <p className="availability">Availability: {mentor.availability}</p>
            <button
              type="button"
              className="btn-primary request-btn"
              onClick={() => handleRequestMentorship(mentor.id, mentor.name)}
            >
              Request Mentorship
            </button>
          </div>
        ))}
      </div>

      {/* Sessions Section */}
      <div className="sessions-section">
        <h2>Your Sessions</h2>
        <div className="sessions-grid">
          {/* Upcoming Sessions */}
          <div className="session-card card">
            <h3>Upcoming</h3>
            {upcomingSessions.length === 0 ? (
              <p>No upcoming sessions.</p>
            ) : (
              <ul>
                {upcomingSessions.map((s) => (
                  <li key={s.id} className="session-item">
                    <strong>{s.mentor}</strong> – {s.topic}
                    <span>{s.date} at {s.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Previous Sessions */}
          <div className="session-card card">
            <h3>Previous</h3>
            {previousSessions.length === 0 ? (
              <p>No previous sessions.</p>
            ) : (
              <ul>
                {previousSessions.map((s) => (
                  <li key={s.id} className="session-item">
                    <strong>{s.mentor}</strong> – {s.topic}
                    <span>{s.date} at {s.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;