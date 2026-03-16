import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../services/apiClient";
import "../styles/PGList.css";

function PGList() {

  const [pgs, setPgs] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchLocation = queryParams.get("location");

  useEffect(() => {
    fetchPGs();
  }, []);

  const fetchPGs = async () => {

    try {

      const res = await apiClient.get("/pgs");

      let data = res.data;

      // filter by location
      if (searchLocation) {

        data = data.filter(pg =>
          pg.location.toLowerCase().includes(searchLocation.toLowerCase())
        );

      }

      setPgs(data);

    } catch (error) {

      console.log("Error fetching PGs");

    }
  };

  return (

    <div className="pglist">

      <h1>Available PGs</h1>

      {pgs.length === 0 ? (

        <p>No PG found for this location</p>

      ) : (

        pgs.map(pg => (

          <div key={pg._id} className="pg-card">

            <h3>{pg.name}</h3>

            <p>Location: {pg.location}</p>

            <p>Owner: {pg.owner}</p>

            <p>Contact: {pg.contact}</p>

            <p>Total Rooms: {pg.totalRooms}</p>

          </div>

        ))

      )}

    </div>

  );
}

export default PGList;