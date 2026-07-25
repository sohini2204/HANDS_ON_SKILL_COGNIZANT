import React from "react";

function FlightDetails() {
  return (
    <div className="flight-details">
      <h2>Available Flight Details</h2>

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
    </div>
  );
}

export default FlightDetails;