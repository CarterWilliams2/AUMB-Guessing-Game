import { useState } from 'react';

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
      <p>Your guess: {guess}</p>
    </div>
  );
};

export default Game;