import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hideOnRoutes = ["/", "/signup"];
  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  return (

    <nav className="navbar">

      <div className="logo">
        RoomRoster
      </div>

      <div className="nav-links">

        <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>Match</Link>
        <Link to="/matches" className={location.pathname === "/matches" ? "active" : ""}>Matches</Link>
        <Link to="/inbox" className={location.pathname === "/inbox" ? "active" : ""}>Chats</Link>
        <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
        
        <div className="profile-menu" ref={dropdownRef} style={{ position: 'relative', marginLeft: '1rem' }}>
          <button 
            className="profile-icon-btn" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ 
              background: 'transparent', color: '#ff7b72', border: 'none', cursor: 'pointer', 
              display: 'flex', alignItems: 'center', padding: '0.4rem', borderRadius: '50%'
            }}
          >
            <FiUser size={24} />
          </button>

          {dropdownOpen && (
            <div className="dropdown-content" style={{
              position: 'absolute', right: 0, top: '40px', background: 'white', 
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden',
              minWidth: '200px', display: 'flex', flexDirection: 'column', zIndex: 100
            }}>
              <Link to="/profile?tab=edit" onClick={() => setDropdownOpen(false)} style={{ padding: '0.8rem 1rem', color: '#4a4a4a', textDecoration: 'none', borderBottom: '1px solid #e6d5d5' }}>Edit Profile</Link>
              <Link to="/profile?tab=preferences" onClick={() => setDropdownOpen(false)} style={{ padding: '0.8rem 1rem', color: '#4a4a4a', textDecoration: 'none', borderBottom: '1px solid #e6d5d5' }}>Preferences</Link>
              <Link to="/contact" onClick={() => setDropdownOpen(false)} style={{ padding: '0.8rem 1rem', color: '#4a4a4a', textDecoration: 'none', borderBottom: '1px solid #e6d5d5' }}>Help & Support</Link>
              <button onClick={handleLogout} style={{ padding: '0.8rem 1rem', color: '#ff6b6b', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
            </div>
          )}
        </div>

      </div>

    </nav>

  );
}

export default Navbar;
