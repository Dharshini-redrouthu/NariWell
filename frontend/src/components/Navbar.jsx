import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logoIcon from "../assets/logos/logo2.png";

export default function Navbar() {

  const location = useLocation();

  return (
    <nav className="navbar">

      {/* BRAND */}
      <div className="nav-brand">
        <img src={logoIcon} alt="NariWell logo" className="logo-icon" />
        <h2 className="brand-text">NariWell  </h2>
        
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
        <Link className={location.pathname === "/predict" ? "active" : ""} to="/predict">Predict</Link>
        <Link className={location.pathname === "/daily-routines" ? "active" : ""} to="/daily-routines">Daily Routines</Link>
        <Link className={location.pathname === "/pcos-symptoms" ? "active" : ""} to="/pcos-symptoms">PCOS</Link>
        <Link className={location.pathname === "/contact" ? "active" : ""} to="/contact">Contact</Link>
      </div>

    </nav>
  );
}
