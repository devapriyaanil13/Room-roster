import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import "../styles/Inbox.css";

function Inbox() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await apiClient.get("/messages/conversations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setConversations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inbox-container">
      <div className="inbox-card">
        <h2>Messages & Matches</h2>
        <p className="inbox-subtitle">People you've matched and connected with.</p>

        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading conversations...</p>
        ) : conversations.length === 0 ? (
          <div className="empty-inbox">
            <p>No matches yet! Get back out there and start swiping.</p>
            <button onClick={() => navigate("/home")}>Find Matches</button>
          </div>
        ) : (
          <div className="conversation-list">
            {conversations.map(conv => (
              <div key={conv._id} className="conversation-item" onClick={() => navigate(`/chat/${conv._id}`)}>
                {conv.avatar ? (
                  <img src={conv.avatar} alt="avatar" className="conv-avatar" />
                ) : (
                  <div className="conv-avatar placeholder">{conv.name.charAt(0).toUpperCase()}</div>
                )}
                <div className="conv-content">
                  <h3>{conv.name}</h3>
                  <p className="latest-msg">{conv.latestMessage}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;
