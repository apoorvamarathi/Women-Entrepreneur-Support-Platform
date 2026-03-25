import { useState, useEffect } from "react";
import api from "../services/api";
import useAuthStore from "../store/useAuthStore";
import "./Mentorship.css";

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [previousSessions, setPreviousSessions] = useState([]);

  const { user } = useAuthStore();
  const isMentor = user?.role === "mentor";

  const fetchSessions = async () => {
    try {
      const sessionsRes = await api.get("/mentorship/sessions");
      if (sessionsRes.data) {
        setUpcomingSessions(sessionsRes.data.upcoming || []);
        setPreviousSessions(sessionsRes.data.previous || []);
      }
    } catch (error) {
      console.error("Failed to fetch sessions", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isMentor) {
          const mentorsRes = await api.get("/mentorship/mentors");
          setMentors(mentorsRes.data);
        }
        await fetchSessions();
      } catch (error) {
        console.error("Failed to fetch mentorship data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isMentor]);

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

  const handleAutoMatch = async () => {
    try {
      const res = await api.post("/mentorship/auto-match");
      if (res.data && res.data.mentor) {
        alert(`Success! You have been auto-matched with ${res.data.mentor.userId?.name || 'a perfect mentor'}!`);
        fetchSessions(); // refresh the sessions grid
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to find an auto-match.");
    }
  };

  const handleUpdateStatus = async (sessionId, newStatus) => {
    try {
      await api.put(`/mentorship/request/${sessionId}`, { status: newStatus });
      alert(`Session marked as ${newStatus}`);
      fetchSessions();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const handleAddNote = async (sessionId, existingNote) => {
    const newNote = window.prompt("Enter progress note:", existingNote || "");
    if (newNote === null) return; // cancelled

    try {
      await api.put(`/mentorship/request/${sessionId}`, { notes: newNote });
      alert("Note updated successfully");
      fetchSessions();
    } catch (err) {
      console.error(err);
      alert("Failed to update note");
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
      <h1 className="page-title">{isMentor ? "Mentee Sessions" : "Mentorship"}</h1>

      {!isMentor && (
        <>
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
            <button className="btn-primary" onClick={handleAutoMatch} style={{ background: '#28C76F', borderColor: '#28C76F' }}>
              ✨ Auto-Match Me!
            </button>
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
                  onClick={() => handleRequestMentorship(mentor.userId?._id || mentor.userId, mentor.userId?.name)}
                  disabled={!mentor.availability}
                >
                  Request Mentorship
                </button>
              </div>
            ))}
          </div>
        </>
      )}

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
                      <div className="session-info">
                        <strong>{s.mentor}</strong> – <span className={`status-${s.status}`}>{s.status}</span>
                        <br/><span>{dateObj.toLocaleString()}</span>
                      </div>
                      
                      {isMentor && s.status === 'pending' && (
                        <div className="session-actions" style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                          <button className="btn-primary btn-sm" onClick={() => handleUpdateStatus(s.id, 'accepted')}>Accept</button>
                          <button className="btn-danger btn-sm" onClick={() => handleUpdateStatus(s.id, 'rejected')}>Reject</button>
                        </div>
                      )}

                      {isMentor && s.status === 'accepted' && (
                        <div className="session-actions" style={{ marginTop: '8px' }}>
                          <button className="btn-primary btn-sm" onClick={() => handleAddNote(s.id, s.notes)}>
                            {s.notes ? "Edit Note" : "Add Note"}
                          </button>
                        </div>
                      )}
                      {s.notes && <p className="session-notes" style={{ marginTop: '8px', fontSize: '0.9rem', fontStyle: 'italic', color: '#555' }}>Note: {s.notes}</p>}
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
                      <div className="session-info">
                        <strong>{s.mentor}</strong> – <span className={`status-${s.status}`}>{s.status}</span>
                        <br/><span>{dateObj.toLocaleString()}</span>
                      </div>
                      
                      {isMentor && (
                        <div className="session-actions" style={{ marginTop: '8px' }}>
                          <button className="btn-primary btn-sm" onClick={() => handleAddNote(s.id, s.notes)}>
                            {s.notes ? "Edit Note" : "Add Note"}
                          </button>
                        </div>
                      )}

                      {s.notes && <p className="session-notes" style={{ marginTop: '8px', fontSize: '0.9rem', fontStyle: 'italic', color: '#555' }}>Note: {s.notes}</p>}
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