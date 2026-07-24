import React, { useState } from 'react';
import './App.css';
import { ListofPlayers, Scorebelow70 } from './Components/ListofPlayers';
import { OddPlayers, EvenPlayers, IndianTeam, IndianPlayers, ListofIndianPlayers } from './Components/IndianPlayers';

// Array of 11 players with name and score
const players = [
  { name: 'Jack', score: 50 },
  { name: 'Michael', score: 70 },
  { name: 'John', score: 40 },
  { name: 'Ann', score: 61 },
  { name: 'Elisabeth', score: 61 },
  { name: 'Sachin', score: 95 },
  { name: 'Dhoni', score: 100 },
  { name: 'Virat', score: 84 },
  { name: 'Jadeja', score: 64 },
  { name: 'Raina', score: 75 },
  { name: 'Rohit', score: 80 }
];

function App() {
  const [flag, setFlag] = useState(true);

  if (flag === true) {
    return (
      <div className="App">
        <div className="toggle-bar">
          <span className="flag-label">Flag = true</span>
          <button className="toggle-btn" onClick={() => setFlag(false)}>Switch to Flag = false</button>
        </div>
        <h1>List of Players</h1>
        <ListofPlayers players={players} />
        <hr />
        <h1>List of Players having Scores Less than 70</h1>
        <Scorebelow70 players={players} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="toggle-bar">
          <span className="flag-label">Flag = false</span>
          <button className="toggle-btn" onClick={() => setFlag(true)}>Switch to Flag = true</button>
        </div>
        <div>
          <h1>Indian Team</h1>
          <h1>Odd Players</h1>
          {OddPlayers(IndianTeam)}
          <hr />
          <h1>Even Players</h1>
          {EvenPlayers(IndianTeam)}
        </div>
        <hr />
        <div>
          <h1>List of Indian Players Merged :</h1>
          <ListofIndianPlayers IndianPlayers={IndianPlayers} />
        </div>
      </div>
    );
  }
}

export default App;
