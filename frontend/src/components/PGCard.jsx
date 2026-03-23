import "../styles/PGCard.css";

function PGCard({ pg }) {
  return (
    <div className="pg-card">
      <h3>{pg.name}</h3>
      <p>{pg.location}</p>
    </div>
  );
}

export default PGCard;
