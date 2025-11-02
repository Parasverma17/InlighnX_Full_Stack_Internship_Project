import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { smartCallback } from "../api/fhir";

function CallBackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      smartCallback(code)
        .then(() => navigate("/"))
        .catch(() => navigate("/error"));
    } else {
      navigate("/error");
    }
  }, [navigate]);

  return (
    <div className="container">
      <h2>Authenticating...</h2>
      <p>Please wait while we complete authentication.</p>
    </div>
  );
}

export default CallBackPage;