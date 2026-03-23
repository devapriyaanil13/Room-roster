import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import "../styles/Match.css";

function Match() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await apiClient.get("/users/roommates", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setProfiles(res.data);
    } catch (error) {
      console.error("Error fetching profiles", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePass = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleConnect = async () => {
    if (profiles.length === 0) return;
    const token = localStorage.getItem("token");
    try {
      await apiClient.post(`/users/match/${profiles[currentIndex]._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/chat/${profiles[currentIndex]._id}`);
    } catch (e) {
      console.error("Match error", e);
      // Still navigate just to guarantee chat fallback if mutually already matched somehow
      navigate(`/chat/${profiles[currentIndex]._id}`);
    }
  };

  if (loading) return <div className="match-container"><h2>Loading potential roommates...</h2></div>;

  if (profiles.length === 0 || currentIndex >= profiles.length) {
    return (
      <div className="match-container">
        <div className="match-card empty-state">
          <h2>No more potential roommates nearby!</h2>
          <p>Check back later or expand your profile preferences.</p>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="match-container">
      <div className="match-card">
        
        <div className="profile-header">
          {currentProfile.avatar ? (
            <img 
              src={currentProfile.avatar} 
              alt="Avatar" 
              className="avatar-placeholder" 
              style={{ objectFit: 'cover' }} 
            />
          ) : (
            <div className="avatar-placeholder">
              {currentProfile.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="name-info">
            <h2>{currentProfile.name}, {currentProfile.gender !== "Any" ? currentProfile.gender : "?"}</h2>
            <span className="location">📍 {currentProfile.locationPreference || "Anywhere"}</span>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="label">Budget</span>
            <span className="value">₹{currentProfile.budget || 0} / mo</span>
          </div>
          <div className="detail-item">
            <span className="label">Looking For</span>
            <span className="value">{currentProfile.lookingFor || "Roommate"}</span>
          </div>
          
          {currentProfile.bio && (
            <div className="bio-section">
              <span className="label">About Me</span>
              <p className="bio-text">"{currentProfile.bio}"</p>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn-pass" onClick={handlePass}>
            <span className="icon">❌</span>
          </button>
          <button className="btn-message" onClick={handleConnect}>
            <span className="icon">💬</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Match;
