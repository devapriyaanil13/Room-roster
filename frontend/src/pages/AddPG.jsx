import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

function AddPG() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [owner, setOwner] = useState("");
  const [contact, setContact] = useState("");
  const [totalRooms, setTotalRooms] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await apiClient.post("/pgs", {
        name,
        location,
        owner,
        contact,
        totalRooms
      });

      console.log("PG added:", res.data);

      alert("PG added successfully");

      navigate("/pgs");

    } catch (error) {

      console.log("Add PG Error:", error.response?.data || error.message);

      alert("Error adding PG");

    }
  };

  return (
    <div>

      <h1>Add PG</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="PG Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Owner"
          value={owner}
          onChange={(e)=>setOwner(e.target.value)}
        />

        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e)=>setContact(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total Rooms"
          value={totalRooms}
          onChange={(e)=>setTotalRooms(e.target.value)}
        />

        <button type="submit">Add PG</button>

      </form>

    </div>
  );
}

export default AddPG;