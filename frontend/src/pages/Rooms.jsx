import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import "../styles/Rooms.css";

function Rooms() {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {

    try {

      const res = await apiClient.get("/rooms");

      setRooms(res.data);

    } catch (error) {

      console.log("Error fetching rooms");

    }
  };

  return (
    <div className="rooms">

      <h1>Rooms</h1>

      <div className="room-container">

        {rooms.length === 0 ? (

          <p>No rooms available</p>

        ) : (

          rooms.map(room => (

            <div key={room._id} className="room-card">

              <h3>Room {room.roomNumber}</h3>

              <p>
                Status:
                {room.isOccupied ? " Occupied" : " Vacant"}
              </p>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Rooms;