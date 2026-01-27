import { Link } from "react-router-dom";
import "./Navbar.css";
import logoIcon from "../assets/logos/logo2.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src={logoIcon} alt="NariWell logo" className="logo-icon" />
        <span className="brand-text">NariWell</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/predict">Predict</Link>
        <Link to="/daily-routines">Daily Routines</Link>
        <Link to="/pcos-symptoms">PCOS</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
