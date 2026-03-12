import { useState, useEffect } from "react";
import api from "../services/api";
import "./Community.css";

const Community = () => {
  const [question, setQuestion] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/community/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to load community posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Networking groups data (Mocked until groups backend is implemented)
  const groups = [
    { id: 1, name: "Tech Startup Group", members: 234, description: "For women in tech startups" },
    { id: 2, name: "Women Founder Network", members: 567, description: "Connect with women founders" },
    { id: 3, name: "Startup Mentorship Circle", members: 189, description: "Find mentors and mentees" },
  ];

  const handlePost = async () => {
    if (question.trim()) {
      try {
        const res = await api.post("/community/posts", { text: question });
        setPosts([res.data, ...posts]);
        setQuestion("");
      } catch (error) {
        console.error("Failed to create post", error);
        alert("Failed to submit post.");
      }
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