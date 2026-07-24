import React from 'react';

// Destructuring: OddPlayers uses array destructuring to get odd-position elements
export function OddPlayers([first, , third, , fifth]) {
  return (
    <div>
      <ul>
        <li>First: {first}</li>
        <li>Third: {third}</li>
        <li>Fifth: {fifth}</li>
      </ul>
    </div>
  );
}

// Destructuring: EvenPlayers uses array destructuring to get even-position elements
export function EvenPlayers([, second, , fourth, , sixth]) {
  return (
    <div>
      <ul>
        <li>Second: {second}</li>
        <li>Fourth: {fourth}</li>
        <li>Sixth: {sixth}</li>
      </ul>
    </div>
  );
}

// Array of Indian Team players
export const IndianTeam = ['Sachin1', 'Dhoni2', 'Virat3', 'Rohit4', 'Yuvaraj5', 'Raina6'];

// Spread Operator: Merging two arrays using ES6 spread syntax
const T20Players = ['First Player', 'Second Player', 'Third Player'];
const RanjiTrophyPlayers = ['Fourth Player', 'Fifth Player', 'Sixth Player'];
export const IndianPlayers = [...T20Players, ...RanjiTrophyPlayers];

// ListofIndianPlayers component - displays merged array
export function ListofIndianPlayers(props) {
  const indianPlayersList = props.IndianPlayers;
  return (
    <div>
      <ul>
        {indianPlayersList.map((item, index) => (
          <li key={index}>Mr. {item}</li>
        ))}
      </ul>
    </div>
  );
}

