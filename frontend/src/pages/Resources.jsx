import { useState, useEffect } from "react";
import api from "../services/api";
import "./Resources.css";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedResource, setSelectedResource] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view' or 'download'

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get('/resources');
        setResources(res.data);
      } catch (err) {
        console.error("Failed to load resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  // Format flat data into sections
  const categoryMap = {
    guides: "Business Guides",
    templates: "Startup Templates",
    videos: "Training Videos",
    schemes: "Government Schemes"
  };

  const resourceSections = Object.keys(categoryMap).map(categoryKey => {
    return {
      id: categoryKey,
      title: categoryMap[categoryKey],
      resources: resources.filter(r => r.category === categoryKey)
    };
  }).filter(section => section.resources.length > 0);

  const openModal = (resource, actionType) => {
    setSelectedResource(resource);
    setModalType(actionType);
  };

  const closeModal = () => {
    setSelectedResource(null);
    setModalType(null);
  };

  // Trigger file download (for download action)
  const handleDownload = (resource) => {
    // Basic mock text file download since real files aren't hosted yet
    const content = `Title: ${resource.title}\nDescription: ${resource.description}\n\nThis is a sample file. In a real app, you would serve the actual file from ${resource.fileUrl || 'a server path'}.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resource.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    closeModal(); // close modal after download starts
  };

  if (loading) return <div className="loading-spinner">Loading resources...</div>;

  return (
    <div className="resources-page">
      <h1 className="page-title">Resource Center</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="resources-container">
        {resourceSections.length === 0 && !error ? (
          <p className="no-data">No resources available at the moment.</p>
        ) : (
          resourceSections.map((section) => (
            <div key={section.id} className="resource-section">
              <h2 className="section-title">{section.title}</h2>
              <div className="resources-grid">
                {section.resources.map((resource) => (
                  <div className="resource-card card" key={resource._id}>
                    <h3>{resource.title}</h3>
                    <p className="resource-description">{resource.description}</p>
                    <button
                      className={`btn-${resource.type}`}
                      onClick={() => openModal(resource, resource.type)}
                    >
                      {resource.type === "view" ? "View" : "Download"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for resource details */}
      {selectedResource && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedResource.title}</h2>
            <p className="modal-description">{selectedResource.description}</p>
            
            {/* Placeholder detailed content */}
            <div className="modal-detail">
              <h3>Details</h3>
              <p>
                This is a detailed view of "{selectedResource.title}". 
                In a real application, you would load the actual content 
                (guide steps, video transcript, scheme eligibility, etc.) 
                from a backend or a static file.
              </p>
              <p>
                <strong>Type:</strong> {modalType === 'view' ? 'Viewable resource' : 'Downloadable file'}
              </p>
              {modalType === 'download' && selectedResource.fileUrl && (
                <p><strong>File:</strong> {selectedResource.fileUrl}</p>
              )}
            </div>

            <div className="modal-actions">
              {modalType === 'download' && (
                <button
                  className="btn-download"
                  onClick={() => handleDownload(selectedResource)}
                >
                  Download File
                </button>
              )}
              <button className="btn-close" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;