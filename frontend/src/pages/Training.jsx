import { useState } from "react";
import "./Training.css";

const Training = () => {
  // Sample program data with schedule and completion status
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: "Digital Marketing",
      trainer: "Alex Morgan",
      duration: "3 weeks",
      schedule: "Mon/Wed 6-8 PM",
      enrolled: false,
      completed: false,
      certificate: null,
    },
    {
      id: 2,
      title: "Financial Management",
      trainer: "John Smith",
      duration: "4 weeks",
      schedule: "Tue/Thu 5-7 PM",
      enrolled: true,
      completed: false,
      certificate: null,
    },
    {
      id: 3,
      title: "Startup Growth Strategies",
      trainer: "Lisa Ray",
      duration: "6 weeks",
      schedule: "Mon/Wed 4-6 PM",
      enrolled: false,
      completed: false,
      certificate: null,
    },
    {
      id: 4,
      title: "Business Planning",
      trainer: "David Chen",
      duration: "2 weeks",
      schedule: "Sat 10 AM-12 PM",
      enrolled: true,
      completed: true,
      certificate: "business-planning-cert.pdf",
    },
  ]);

  const handleEnroll = (id) => {
    setPrograms(
      programs.map((p) => (p.id === id ? { ...p, enrolled: true } : p))
    );
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