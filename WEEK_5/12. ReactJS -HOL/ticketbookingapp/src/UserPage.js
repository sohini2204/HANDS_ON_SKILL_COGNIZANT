import React from "react";

function UserPage({ onLogout }) {
  return (
    <div>
      <h1>Welcome User</h1>

      <p>You are logged in.</p>

      <h2>Book Your Flight Ticket</h2>

      <form>
        <label>Passenger Name:</label>
        <br />

        <input
          type="text"
          placeholder="Enter passenger name"
        />

        <br /><br />

        <label>Choose Flight:</label>
        <br />

        <select>
          <option>AI-101 - Kolkata to Delhi</option>
          <option>6E-202 - Mumbai to Bangalore</option>
        </select>

        <br /><br />

        <button type="submit">
          Book Ticket
        </button>
      </form>

      <br />

      <button onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserPage;