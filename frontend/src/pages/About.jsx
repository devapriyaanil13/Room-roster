import "../styles/InfoPages.css";

function About() {
  return (
    <div className="info-container">
      <div className="info-box">
        <h1>About RoomRoster</h1>
        <p>
          Welcome to RoomRoster! We are revolutionizing the way people find roommates.
          Instead of scrolling through endless, unorganized lists of properties and strangers,
          we provide a clean, modern, dating-app style interface focused entirely on making quick, meaningful connections.
        </p>
        <p>
          Set your budget, declare your preferences, and swipe through potential roommates in your area.
          When you find a great match, you can instantly message them right here on the platform!
        </p>
        <div className="team-section">
          <h3>Our Mission</h3>
          <p>To end the stress of housing hunts by connecting compatible roommates effortlessly.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
