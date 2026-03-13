import { useState } from "react";
import "./Resources.css";

const Resources = () => {
  // Sample resource data grouped by category
  const resourceSections = [
    {
      id: "guides",
      title: "Business Guides",
      resources: [
        {
          id: 1,
          title: "How to Start a Business",
          description: "Step-by-step guide for launching your startup.",
          type: "view",
          link: "/resources/start-business-guide", // placeholder for actual link
        },
        {
          id: 2,
          title: "Marketing 101",
          description: "Essential marketing strategies for small businesses.",
          type: "view",
          link: "/resources/marketing-101",
        },
        {
          id: 3,
          title: "Legal Basics for Entrepreneurs",
          description: "Understand contracts, licenses, and compliance.",
          type: "view",
          link: "/resources/legal-basics",
        },
      ],
    },
    {
      id: "templates",
      title: "Startup Templates",
      resources: [
        {
          id: 4,
          title: "Business Plan Template",
          description: "Editable template to create your business plan.",
          type: "download",
          fileUrl: "/templates/business-plan-template.docx", // placeholder file path
        },
        {
          id: 5,
          title: "Financial Projection Spreadsheet",
          description: "Excel sheet for revenue and expense forecasting.",
          type: "download",
          fileUrl: "/templates/financial-projections.xlsx",
        },
        {
          id: 6,
          title: "Pitch Deck Outline",
          description: "Structure your investor presentation.",
          type: "download",
          fileUrl: "/templates/pitch-deck-outline.pptx",
        },
      ],
    },
    {
      id: "videos",
      title: "Training Videos",
      resources: [
        {
          id: 7,
          title: "Pitching to Investors",
          description: "Learn how to deliver a winning pitch.",
          type: "view",
          link: "/videos/pitch-training",
        },
        {
          id: 8,
          title: "Financial Projections Basics",
          description: "Understand key financial metrics.",
          type: "view",
          link: "/videos/financial-basics",
        },
        {
          id: 9,
          title: "Building Your Team",
          description: "Hiring and culture for startups.",
          type: "view",
          link: "/videos/building-team",
        },
      ],
    },
    {
      id: "schemes",
      title: "Government Schemes",
      resources: [
        {
          id: 10,
          title: "Women Entrepreneurship Scheme",
          description: "Funding and support for women-led businesses.",
          type: "view",
          link: "/schemes/women-entrepreneurship",
        },
        {
          id: 11,
          title: "Startup India",
          description: "Benefits and registration process.",
          type: "view",
          link: "/schemes/startup-india",
        },
        {
          id: 12,
          title: "MSME Loans",
          description: "Government-backed loans for small businesses.",
          type: "view",
          link: "/schemes/msme-loans",
        },
      ],
    },
  ];

  const [selectedResource, setSelectedResource] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view' or 'download'

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
    // Create a simple text file with resource details
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

  return (
    <div className="resources-page">
      <h1 className="page-title">Resource Center</h1>

      <div className="resources-container">
        {resourceSections.map((section) => (
          <div key={section.id} className="resource-section">
            <h2 className="section-title">{section.title}</h2>
            <div className="resources-grid">
              {section.resources.map((resource) => (
                <div className="resource-card card" key={resource.id}>
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
        ))}
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