import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Match from "./pages/Match";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Inbox from "./pages/Inbox";

import MatchesList from "./pages/MatchesList";

function App() {

  const token = localStorage.getItem("token");

  return (

    <Router>

      <Navbar />

      <Routes>

        {/* Default route → LOGIN */}
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Login />}
        />

        <Route path="/signup" element={<Signup />} />

        {/* Public info routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Match />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          }
        />

        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <MatchesList />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </Router>

  );
}

export default App;
