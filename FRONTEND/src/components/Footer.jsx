import React from "react";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <strong className="footer-brand">InlighnX FRAT</strong>
        <p>
          © {new Date().getFullYear()} InlighnX Fall Risk Assessment Tool. All rights reserved.
          <br />
          Empowering healthcare professionals with intelligent fall risk assessment and prevention.
        </p>
      </div>
    </footer>
  );
}
