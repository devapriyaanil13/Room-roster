import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

function PGList() {

  const [pgs, setPgs] = useState([]);

  useEffect(() => {
    fetchPGs();
  }, []);

  const fetchPGs = async () => {

    try {

      const res = await apiClient.get("/pgs");

      console.log("PG API:", res.data);

      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data.pgs)) {
        data = res.data.pgs;
      }

      setPgs(data);

    } catch (error) {

      console.log("Fetch Error:", error);
      setPgs([]);

    }
  };

  return (
    <div>

      <h1>PG List</h1>

      {pgs.length === 0 ? (

        <p>No PG available</p>

      ) : (

        pgs.map(pg => (

          <div key={pg._id}>

            <h3>{pg.name}</h3>
            <p>{pg.location}</p>

          </div>

        ))

      )}

    </div>
  );
}

export default PGList;