import { useState, useEffect } from "react";
import api from "../services/api";
import "./Mentorship.css";

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [previousSessions, setPreviousSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorsRes, sessionsRes] = await Promise.all([
          api.get("/mentorship/mentors"),
          api.get("/mentorship/sessions")
        ]);
        setMentors(mentorsRes.data);
        if (sessionsRes.data) {
          setUpcomingSessions(sessionsRes.data.upcoming || []);
          setPreviousSessions(sessionsRes.data.previous || []);
        }
      } catch (error) {
        console.error("Failed to fetch mentorship data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    const mentorName = mentor.userId?.name || 'Unknown Mentor';
    const matchesSearch =
      mentorName.toLowerCase().includes(search.toLowerCase()) ||
      (mentor.industryExpertise?.join(', ') || '').toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industryFilter === "" || (mentor.industryExpertise && mentor.industryExpertise.includes(industryFilter));
    const matchesExperience = experienceFilter === "" || (mentor.experience && mentor.experience.toString().includes(experienceFilter));
    return matchesSearch && matchesIndustry && matchesExperience;
  });

  // Unique industries for filter dropdown
  const industries = [...new Set(mentors.map((m) => m.industryExpertise).filter(Boolean).flat())];

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
          <div className="mentor-card card" key={mentor._id || mentor.id}>
            <div className="mentor-avatar">{mentor.userId?.name?.charAt(0).toUpperCase() || '👩'}</div>
            <h3>{mentor.userId?.name || 'Unknown Mentor'}</h3>
            <p className="expertise">{mentor.industryExpertise?.join(', ') || 'Not specified'}</p>
            <p className="experience">Experience: {mentor.experience || 0} years</p>
            <p className="availability">{mentor.availability ? '✓ Available' : '✗ Not Available'}</p>
            <button
              type="button"
              className="btn-primary request-btn"
              onClick={() => handleRequestMentorship(mentor._id, mentor.userId?.name)}
              disabled={!mentor.availability}
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
                {upcomingSessions.map((s) => {
                  const dateObj = new Date(s.time || s.sessionDate || s.date);
                  return (
                    <li key={s.id} className="session-item">
                      <strong>{s.mentor}</strong> – {s.status}
                      <span>{dateObj.toLocaleString()}</span>
                    </li>
                  );
                })}
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
                {previousSessions.map((s) => {
                  const dateObj = new Date(s.time || s.sessionDate || s.date);
                  return (
                    <li key={s.id} className="session-item">
                      <strong>{s.mentor}</strong> – {s.status}
                      <span>{dateObj.toLocaleString()}</span>
                      {s.notes && <p className="session-notes">Notes: {s.notes}</p>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;