import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../pages/scrolltosection";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (id) => {
    if (location.pathname !== "/") {
      // Go to landing and ask it to scroll when it renders.
      navigate("/", { state: { scrollTo: id } });
    } else {
      // Already on landing: scroll now.
      scrollToSection(id);
    }
  };

  return (
    <header className="topbar" role="banner">
      <button
        className="topbar__brand"
        onClick={() => go("home")}
        aria-label="Home"
      >
        InlighnX FRAT
      </button>

      <nav className="topbar__nav" aria-label="Primary">
        <button className="topbar__link" onClick={() => go("home")}>
          Home
        </button>
        <button className="topbar__link" onClick={() => go("results")}>
          Testimonials
        </button>
        <button className="topbar__link" onClick={() => go("contact")}>
          Contact
        </button>
      </nav>
    </header>
  );
}