import { useLocation } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  const location = useLocation();
  const hideOnRoutes = ["/", "/signup"];
  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="footer">
      <p>© 2026 RoomRoster | Roommate Matching Platform</p>
    </footer>
  );
}

export default Footer;
