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

  const handleResourceAction = (resource) => {
    if (resource.type === "view") {
      // In a real app, you might navigate to a detail page
      alert(`Viewing: ${resource.title} - This would open the resource page.`);
      // Example: navigate(resource.link); if using react-router
    } else if (resource.type === "download") {
      // Simulate download
      alert(`Downloading: ${resource.title} - This would start a file download.`);
      // In a real app, you could trigger file download:
      // const link = document.createElement('a');
      // link.href = resource.fileUrl;
      // link.download = resource.title;
      // link.click();
    }
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
                    onClick={() => handleResourceAction(resource)}
                  >
                    {resource.type === "view" ? "View" : "Download"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;