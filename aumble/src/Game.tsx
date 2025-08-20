import { useState } from "react";
import "./Game.css";

function Game() {
  type Guess = {
  name: string;
  instrument: string;
  year: string;
  role: string;
  major: string;
}; 

  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmitGuess = () => {
    if (!guess.trim()) return;

    const newGuess = {
      name: guess,
      instrument: '',
      year: '',
      role: '',
      major: '',
    };

    setGuesses([...guesses, newGuess]);
    setGuess('');                       
  };

 

  return (
    <div className="game-container">
      <input 
        type="text" 
        placeholder="Enter a band member" 
        value={guess} 
        onChange={handleChange} 
      />
      <button onClick={handleSubmitGuess}>Submit Guess</button>

      {guesses.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Guess #</th>
              <th>Name</th>
              <th>Instrument</th>
              <th>Year</th>
              <th>Role</th>
              <th>Major</th>
            </tr>
          </thead>
          <tbody>
            {guesses.map((g, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{g.name}</td>
                <td>{g.instrument}</td>
                <td>{g.year}</td>
                <td>{g.role}</td>
                <td>{g.major}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Game;
