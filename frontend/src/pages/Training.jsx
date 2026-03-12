import { useState, useEffect } from "react";
import api from "../services/api";
import "./Training.css";

const Training = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await api.get("/training");
        setPrograms(res.data);
      } catch (error) {
        console.error("Failed to load training programs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const handleEnroll = async (id) => {
    try {
      await api.post(`/training/${id}/enroll`);
      setPrograms(
        programs.map((p) => (p.id === id ? { ...p, enrolled: true } : p))
      );
      alert("Successfully enrolled!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to enroll.");
    }
  };

  // Derived data for sections
  const enrolledPrograms = programs.filter((p) => p.enrolled && !p.completed);
  const completedPrograms = programs.filter((p) => p.completed);
  const certificates = completedPrograms.map((p) => ({
    id: p.id,
    title: p.title,
    certificate: p.certificate,
  }));

  return (
    <div className="training-page">
      <h1 className="page-title">Training Programs</h1>

      {/* All Programs Grid */}
      <div className="programs-grid">
        {programs.map((program) => (
          <div className="program-card card" key={program.id}>
            <h3>{program.title}</h3>
            <p className="trainer">Trainer: {program.trainer}</p>
            <p className="duration">Duration: {program.duration}</p>
            <p className="schedule">Schedule: {program.schedule}</p>
            <button
              className={`btn-primary ${program.enrolled ? "enrolled" : ""}`}
              onClick={() => !program.enrolled && handleEnroll(program.id)}
              disabled={program.enrolled || program.completed}
            >
              {program.completed
                ? "Completed"
                : program.enrolled
                ? "Enrolled"
                : "Enroll Now"}
            </button>
          </div>
        ))}
      </div>

      {/* User Training Sections */}
      <div className="user-training-sections">
        {/* Enrolled Programs */}
        <div className="section-card card">
          <h2>Enrolled Programs</h2>
          {enrolledPrograms.length === 0 ? (
            <p className="no-data">You are not enrolled in any programs.</p>
          ) : (
            <ul className="training-list">
              {enrolledPrograms.map((p) => (
                <li key={p.id}>
                  <strong>{p.title}</strong> – {p.trainer}
                  <span className="program-schedule">{p.schedule}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Completed Programs */}
        <div className="section-card card">
          <h2>Completed Programs</h2>
          {completedPrograms.length === 0 ? (
            <p className="no-data">No completed programs yet.</p>
          ) : (
            <ul className="training-list">
              {completedPrograms.map((p) => (
                <li key={p.id}>
                  <strong>{p.title}</strong> – {p.trainer}
                  <span className="program-schedule">Completed</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Certificates */}
        <div className="section-card card">
          <h2>Certificates</h2>
          {certificates.length === 0 ? (
            <p className="no-data">No certificates earned yet.</p>
          ) : (
            <ul className="certificate-list">
              {certificates.map((cert) => (
                <li key={cert.id}>
                  <span>{cert.title}</span>
                  <button className="btn-secondary">View Certificate</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Training;