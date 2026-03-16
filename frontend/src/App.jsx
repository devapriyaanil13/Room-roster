import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PGList from "./pages/PGList";
import Rooms from "./pages/Rooms";
import AddPG from "./pages/AddPG";

function App() {

  return (

    <Router>

      <Navbar />

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* Search Page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PG List */}
        <Route
          path="/pgs"
          element={
            <ProtectedRoute>
              <PGList />
            </ProtectedRoute>
          }
        />

        {/* Rooms */}
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />

        {/* Add PG */}
        <Route
          path="/add-pg"
          element={
            <ProtectedRoute>
              <AddPG />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </Router>

  );
}

export default App;