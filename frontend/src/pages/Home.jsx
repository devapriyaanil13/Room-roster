import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {

  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/pgs?location=${location}&name=${name}&rooms=${rooms}`);
  };

  return (
    <div className="home">

      <div className="search-box">

        <h1>Find Your Perfect PG</h1>

        <form onSubmit={handleSearch}>

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
          />

          <input
            type="text"
            placeholder="PG Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Min Rooms"
            value={rooms}
            onChange={(e)=>setRooms(e.target.value)}
          />

          <button type="submit">Search</button>

        </form>

      </div>

    </div>
  );
}

export default Home;