import React from "react";
import FlightDetails from "./FlightDetails";

function GuestPage({ onLogin }) {
  return (
    <div>
      <h1>Welcome Guest</h1>

      <p>Browse available flights below.</p>

      <FlightDetails />

      <button onClick={onLogin}>
        Login
      </button>
    </div>
  );
}

export default GuestPage;