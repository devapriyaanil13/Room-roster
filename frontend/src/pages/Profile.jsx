import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../services/apiClient";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const requestedTab = queryParams.get("tab") || "edit";

  const [activeTab, setActiveTab] = useState(requestedTab);
  const [loadingImage, setLoadingImage] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    budget: "",
    locationPreference: "",
    gender: "Any",
    preferredGender: "Any",
    lookingFor: "",
    bio: "",
    avatar: "",
    showToNonSelectedGender: true
  });

  useEffect(() => {
    setActiveTab(requestedTab);
  }, [requestedTab]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await apiClient.get("/users/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setProfile({
        name: res.data.name || "",
        email: res.data.email || "",
        budget: res.data.budget || "",
        locationPreference: res.data.locationPreference || "",
        gender: res.data.gender || "Any",
        preferredGender: res.data.preferredGender || "Any",
        lookingFor: res.data.lookingFor || "",
        bio: res.data.bio || "",
        avatar: res.data.avatar || "",
        showToNonSelectedGender: res.data.showToNonSelectedGender !== false
      });
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoadingImage(true);
    try {
      const res = await apiClient.post("/upload", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setProfile({ ...profile, avatar: res.data.url });
    } catch (error) {
      console.error("Error uploading image", error);
      alert("Failed to upload image.");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(
        "/users/profile", 
        profile,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProfile({ ...profile, [e.target.name]: value });
  };

  return (
    <div className="profile-container">
      <div className="profile-box" style={{ maxWidth: '650px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', borderBottom: '1px solid #e6d5d5', marginBottom: '2rem', paddingBottom: '1rem' }}>
          <button 
            type="button" 
            onClick={() => setActiveTab("edit")} 
            style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: activeTab === 'edit' ? 'bold' : 'normal', color: activeTab === 'edit' ? '#ff7b72' : '#888', cursor: 'pointer' }}
          >Edit Profile</button>
          <button 
            type="button" 
            onClick={() => setActiveTab("preferences")} 
            style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: activeTab === 'preferences' ? 'bold' : 'normal', color: activeTab === 'preferences' ? '#ff7b72' : '#888', cursor: 'pointer' }}
          >Preferences</button>
        </div>

        <form onSubmit={handleSubmit}>
          
          {activeTab === "edit" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#e6d5d5', overflow: 'hidden', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: '#888' }}>No Image</span>
                  )}
                </div>
                <label style={{ background: '#ff7b72', color: 'white', padding: '0.5rem 1rem', borderRadius: '24px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {loadingImage ? "Uploading..." : "Upload Picture"}
                  <input type="file" style={{ display: 'none' }} onChange={handleImageUpload} accept="image/*" disabled={loadingImage} />
                </label>
              </div>

              <label>Name</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} />
              
              <label>Email</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} />
              
              <label>Your Gender</label>
              <select name="gender" value={profile.gender} onChange={handleChange}>
                <option value="Any">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <label>Bio / About Me</label>
              <textarea 
                name="bio"
                placeholder="Tell potential roommates about yourself..." 
                value={profile.bio} 
                onChange={handleChange} 
                style={{ minHeight: '120px' }}
              ></textarea>
            </div>
          )}

          {activeTab === "preferences" && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label>Max Budget (₹)</label>
              <input 
                type="number" 
                name="budget"
                placeholder="e.g. 15000" 
                value={profile.budget} 
                onChange={handleChange} 
              />

              <label>Preferred Location</label>
              <input 
                type="text" 
                name="locationPreference"
                placeholder="e.g. Downtown" 
                value={profile.locationPreference} 
                onChange={handleChange} 
              />

              <label>Looking For (Type)</label>
              <select name="lookingFor" value={profile.lookingFor} onChange={handleChange}>
                <option value="">Select Option</option>
                <option value="Roommate">Roommate</option>
                <option value="PG">PG</option>
                <option value="Both">Both</option>
              </select>

              <label>Preferred Match Gender</label>
              <select name="preferredGender" value={profile.preferredGender} onChange={handleChange}>
                <option value="Any">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', background: '#fdfbf7', padding: '1rem', borderRadius: '12px', border: '1px solid #e6d5d5' }}>
                <input 
                  type="checkbox" 
                  name="showToNonSelectedGender" 
                  checked={profile.showToNonSelectedGender} 
                  onChange={handleChange} 
                  style={{ width: 'auto', margin: 0 }}
                />
                <label style={{ margin: 0, fontSize: '0.9rem', textTransform: 'none', color: '#4a4a4a', fontWeight: '500' }}>
                  Show my profile to users outside my preferred match gender
                </label>
              </div>
            </div>
          )}

          <button type="submit" style={{ marginTop: '2rem', width: '100%' }}>Save Settings</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
