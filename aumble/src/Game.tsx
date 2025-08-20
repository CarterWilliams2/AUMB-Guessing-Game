import { useState } from 'react';
import './Game.css';

function Game() {
  const [guess, setGuess] = useState('');

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  return (
    <div className="game-container">
      <input 
        type="text" 
        placeholder="Enter a band member" 
        value={guess} 
        onChange={handleChange} 
      />
      <table>
  <thead>
    <tr>
      <th>Guess #</th>
      <th>Name</th>
      <th>Instrument</th>
      <th>Year</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    {/* Rows will go here later */}
  </tbody>
</table>
    </div>
  );
};

export default Game;