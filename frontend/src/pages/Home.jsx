import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {

  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [pgName, setPgName] = useState("");
  const [rooms, setRooms] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/pgs?location=${location}&name=${pgName}&rooms=${rooms}&status=${status}`
    );
  };

  return (

    <div className="home">

      <div className="search-box">

        <h1>Find Your Perfect PG</h1>

        <form onSubmit={handleSearch}>

          <input
            type="text"
            placeholder="Search by Location"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
          />

          <input
            type="text"
            placeholder="Search PG Name"
            value={pgName}
            onChange={(e)=>setPgName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Minimum Rooms"
            value={rooms}
            onChange={(e)=>setRooms(e.target.value)}
          />

          <select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
          >
            <option value="">Room Status</option>
            <option value="vacant">Vacant</option>
            <option value="occupied">Occupied</option>
          </select>

          <button type="submit">
            Search
          </button>

        </form>

      </div>

    </div>
  );
}

export default Home;