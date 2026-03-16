import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (

    <nav className="navbar">

      <div className="logo">
        RoomRoster
      </div>

      <div className="nav-links">

        <Link to="/">Search</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/pgs">PGs</Link>

        <Link to="/rooms">Rooms</Link>

        <Link to="/add-pg">Add PG</Link>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>

      </div>

    </nav>

  );
}

export default Navbar;