import React from 'react';

// ListofPlayers component - uses map() to display all players
export function ListofPlayers(props) {
  const players = props.players;
  return (
    <div>
      <ul>
        {players.map((item, index) => (
          <li key={index}>
            Mr. {item.name} <span>{item.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Scorebelow70 component - uses filter() and map() to display players with score <= 70
export function Scorebelow70(props) {
  const players = props.players;
  const players70 = players.filter((item) => item.score <= 70);
  return (
    <div>
      <ul>
        {players70.map((item, index) => (
          <li key={index}>
            Mr. {item.name} <span>{item.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

