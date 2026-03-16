import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import "../styles/Dashboard.css";

function Dashboard() {

  const [pgs, setPgs] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [residents, setResidents] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {

    try {

      const pgRes = await apiClient.get("/pgs");
      const roomRes = await apiClient.get("/rooms");

      const roomData = roomRes.data;

      const occupiedRooms = roomData.filter(room => room.isOccupied);

      setPgs(pgRes.data.length);
      setRooms(roomData.length);
      setResidents(occupiedRooms.length);

    } catch (error) {

      console.error("Error fetching dashboard data", error);

    }
  };

  return (
    <div className="dashboard">

      <h1>RoomRoster Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Total PGs</h3>
          <p>{pgs}</p>
        </div>

        <div className="card">
          <h3>Total Rooms</h3>
          <p>{rooms}</p>
        </div>

        <div className="card">
          <h3>Total Residents</h3>
          <p>{residents}</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;