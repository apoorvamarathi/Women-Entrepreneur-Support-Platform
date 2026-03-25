import { useState, useEffect } from "react";
import api from "../services/api";
import "./Community.css";

const Community = () => {
  const [question, setQuestion] = useState("");
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, groupsRes] = await Promise.all([
          api.get("/community/posts"),
          api.get("/community/groups")
        ]);
        setPosts(postsRes.data);
        setGroups(groupsRes.data);
      } catch (error) {
        console.error("Failed to load community data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const handleReply = async (postId) => {
    const reply = replyText[postId];
    if (!reply || reply.trim() === "") {
      alert("Please enter a reply");
      return;
    }

    try {
      const res = await api.post(`/community/posts/${postId}/reply`, { text: reply });
      // Update the post with the new reply returned from the server (which includes User metadata)
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            replies: res.data.replies,
            repliesCount: res.data.repliesCount
          };
        }
        return post;
      }));
      // Clear the reply input
      setReplyText({ ...replyText, [postId]: "" });
      setExpandedPostId(null);
    } catch (error) {
      console.error("Failed to reply to post", error);
      alert(error.response?.data?.message || "Failed to post reply");
    }
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
                
                {/* Show replies if expanded */}
                {expandedPostId === post.id && post.replies && post.replies.length > 0 && (
                  <div className="replies-section" style={{ marginTop: '10px', paddingLeft: '20px', borderLeft: '2px solid #ddd' }}>
                    {post.replies.map((reply, idx) => (
                      <div key={idx} style={{ marginBottom: '10px', fontSize: '0.9em' }}>
                        <strong>{reply.userId?.name || 'Anonymous'}</strong>
                        <p>{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply form */}
                {expandedPostId === post.id && (
                  <div className="reply-form" style={{ marginTop: '10px' }}>
                    <textarea
                      value={replyText[post.id] || ""}
                      onChange={(e) => setReplyText({ ...replyText, [post.id]: e.target.value })}
                      placeholder="Write a reply..."
                      rows="2"
                      className="input-field"
                      style={{ width: '100%' }}
                    />
                    <button
                      className="btn-primary"
                      onClick={() => handleReply(post.id)}
                      style={{ marginTop: '5px' }}
                    >
                      Post Reply
                    </button>
                  </div>
                )}

                <div className="post-footer">
                  <span className="post-replies">{post.repliesCount || 0} replies</span>
                  <button
                    className="reply-btn"
                    onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                  >
                    {expandedPostId === post.id ? "Hide" : "Reply"}
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