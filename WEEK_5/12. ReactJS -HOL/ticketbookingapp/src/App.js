import React, { useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login function
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Guest Page
  const GuestPage = () => {
    return (
      <div className="page">
        <h2>Welcome Guest</h2>

        <p>
          You can browse the available flight details.
          Login to book a ticket.
        </p>

        <h3>Available Flight Details</h3>

        <table>
          <thead>
            <tr>
              <th>Flight</th>
              <th>From</th>
              <th>To</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>AI-101</td>
              <td>Kolkata</td>
              <td>Delhi</td>
              <td>₹5000</td>
            </tr>

            <tr>
              <td>6E-202</td>
              <td>Mumbai</td>
              <td>Bangalore</td>
              <td>₹4500</td>
            </tr>
          </tbody>
        </table>

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  };

  // User Page
  const UserPage = () => {
    return (
      <div className="page">
        <h2>Welcome User</h2>

        <p>You are logged in and can book your flight ticket.</p>

        <h3>Book Your Flight Ticket</h3>

        <form>
          <label>Passenger Name:</label>
          <br />

          <input
            type="text"
            placeholder="Enter passenger name"
          />

          <br />
          <br />

          <label>Select Flight:</label>
          <br />

          <select>
            <option>
              AI-101 - Kolkata to Delhi
            </option>

            <option>
              6E-202 - Mumbai to Bangalore
            </option>
          </select>

          <br />
          <br />

          <button type="submit">
            Book Ticket
          </button>
        </form>

        <br />

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  };

  // Conditional Rendering
  return (
    <div className="App">
      <h1>Ticket Booking Application</h1>

      {isLoggedIn ? <UserPage /> : <GuestPage />}
    </div>
  );
}

export default App;