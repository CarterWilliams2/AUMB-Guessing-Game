import './App.css';
import Game from './Game';
import { useState } from 'react';

function App() {

   const [showInstructions, setShowInstructions] = useState(false);


  return (
    <div className="App">
      <h1>AUMBLE</h1>
      <h2>An AUMB Guessing Game</h2>
      <button onClick={() => setShowInstructions(true)}>How to Play</button>
      <h3>Last Updated: 10/7 7:16am</h3>

      {showInstructions && (
        <div className="modal-overlay" onClick={() => setShowInstructions(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>How to Play</h2>
            <p>Enter the name of a band member to make a guess.</p>
            <p>An exact match in any of the categories will result in a green cell 🟩 </p>
            <p>Instruments of the same family (Brass, Woodwinds, Percussion, Tiger Eyes) will result in a yellow cell 🟨</p>
            <p>Years that are within 1 year of the answer will result in a yellow cell 🟨</p>
            <p>Leadership roles that do not match exactly will result in a yellow cell 🟨</p>
            <p>No similarity will result in a gray cell ⬜️</p>
            <button onClick={() => setShowInstructions(false)}>Close</button>
          </div>
        </div>
      )}

      <Game />
    </div>
  );
};

export default App;
