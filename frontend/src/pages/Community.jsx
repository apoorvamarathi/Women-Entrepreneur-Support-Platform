import { useState } from "react";
import "./Community.css";

const Community = () => {
  const [question, setQuestion] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Anjali",
      text: "How to raise funding for a sustainable fashion brand?",
      replies: 3,
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Riya",
      text: "Looking for a co-founder in ed-tech space.",
      replies: 5,
      time: "1 day ago",
    },
    {
      id: 3,
      user: "Meera",
      text: "Any recommendations for good mentorship programs?",
      replies: 2,
      time: "3 days ago",
    },
  ]);

  // Networking groups data
  const groups = [
    { id: 1, name: "Tech Startup Group", members: 234, description: "For women in tech startups" },
    { id: 2, name: "Women Founder Network", members: 567, description: "Connect with women founders" },
    { id: 3, name: "Startup Mentorship Circle", members: 189, description: "Find mentors and mentees" },
  ];

  const handlePost = () => {
    if (question.trim()) {
      setPosts([
        { id: Date.now(), user: "You", text: question, replies: 0, time: "Just now" },
        ...posts,
      ]);
      setQuestion("");
    }
  };

  const handleReply = (postId) => {
    // For demo, just alert
    alert(`Reply to post #${postId} - This would open a reply form.`);
  };

  const handleJoinGroup = (groupName) => {
    alert(`You joined ${groupName}!`);
  };

  return (
    <div className="community-page">
      <h1 className="page-title">Community</h1>

      <div className="community-content">
        {/* Left side - Discussion Forum */}
        <div className="forum-section card">
          <h2>Discussion Forum</h2>
          <div className="ask-question">
            <textarea
              placeholder="Ask a question or start a discussion..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="3"
              className="input-field"
            ></textarea>
            <button onClick={handlePost} className="btn-primary">
              Ask Question
            </button>
          </div>

          <div className="posts-list">
            {posts.map((post) => (
              <div className="post-item" key={post.id}>
                <div className="post-header">
                  <span className="post-user">{post.user}</span>
                  <span className="post-time">{post.time}</span>
                </div>
                <p className="post-text">{post.text}</p>
                <div className="post-footer">
                  <span className="post-replies">{post.replies} replies</span>
                  <button
                    className="reply-btn"
                    onClick={() => handleReply(post.id)}
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Networking Groups */}
        <div className="groups-section card">
          <h2>Networking Groups</h2>
          <div className="groups-list">
            {groups.map((group) => (
              <div className="group-card" key={group.id}>
                <h3>{group.name}</h3>
                <p className="group-members">{group.members} members</p>
                <p className="group-description">{group.description}</p>
                <button
                  className="btn-secondary"
                  onClick={() => handleJoinGroup(group.name)}
                >
                  Join Group
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;