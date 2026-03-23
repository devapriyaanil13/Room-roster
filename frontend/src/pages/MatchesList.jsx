import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import "../styles/MatchesList.css";

function MatchesList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await apiClient.get("/users/matches/list", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMatches(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="matches-container">
      <div className="matches-card">
        <h2>Your Matched Roommates</h2>
        <p className="matches-subtitle">People who have mutually matched with your profile.</p>

        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading matched profiles...</p>
        ) : matches.length === 0 ? (
          <div className="empty-matches">
            <p>You haven't matched with anyone yet.</p>
            <button onClick={() => navigate("/home")}>Keep Swiping</button>
          </div>
        ) : (
          <div className="matches-grid">
            {matches.map(match => (
              <div key={match._id} className="match-grid-item" onClick={() => navigate(`/chat/${match._id}`)}>
                {match.avatar ? (
                  <img src={match.avatar} alt="avatar" className="match-avatar" />
                ) : (
                  <div className="match-avatar placeholder">{match.name.charAt(0).toUpperCase()}</div>
                )}
                <div className="match-info">
                  <h3>{match.name}</h3>
                  <p className="match-location">📍 {match.locationPreference || "Anywhere"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchesList;
