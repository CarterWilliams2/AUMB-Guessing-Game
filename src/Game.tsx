import { useState, useEffect } from "react";
import "./Game.css";
import { ComparisonResult, Guess } from "./types";
import { compareGuess } from "./utils/compareGuess";
import members from "./members.json";
import useDebounce from "./hooks/useDebounce";
import { makeWinMessage } from "./utils/makeWinMessage";

function Game() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [allMembers] = useState(members);
  const memberNames = allMembers.map((m) => m.name);
  const [filteredMembers, setFilteredMembers] = useState<string[]>(memberNames);
  const debouncedGuess = useDebounce(guess, 200);
  const [error, setError] = useState("");
  let winMessage: string = "";

  const secretMember: Guess = allMembers.find(
    (m) => m.name === "Tae Moon"
  ) ?? {
    name: "Unknown",
    section: "",
    year: "",
    role: "",
    auburnID: "",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  useEffect(() => {
    const results = memberNames
      .filter((name) =>
        name.toLowerCase().includes(debouncedGuess.toLowerCase())
      )
      .slice(0, 10);
    setFilteredMembers(results);
  }, [debouncedGuess]);

  const handleSubmitGuess = () => {
    if (!guess.trim()) return;

    const found = allMembers.find(
      (m) => m.name.toLowerCase().trim() === guess.toLowerCase().trim()
    );

    if (found) {
      setGuesses([...guesses, found]);
      setError("");
    } else {
      setError("No member found with that name!");
    }

    setGuess("");
  };

  const results: ComparisonResult[] = guesses.map((g) =>
    compareGuess(g, secretMember)
  );

  const lastComparison =
    results.length > 0 ? results[results.length - 1] : null;

  let winMeassage = "";
  if (lastComparison?.equal) {
    winMessage = makeWinMessage(results);
  }

  return (
    <div className="game-container">
      {lastComparison?.equal ? (
        <>
          <h1>You guessed the daily secret member!</h1>
          <p style={{ whiteSpace: "pre-line" }}>{winMessage}</p>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter a band member"
            value={guess}
            onChange={handleChange}
            list="members-list"
          />

          <datalist id="members-list">
            {filteredMembers.map((name, i) => (
              <option key={i} value={name} />
            ))}
          </datalist>

          <button onClick={handleSubmitGuess}>Submit Guess</button>

          {error && <p className="error">{error}</p>}
        </>
      )}

      {guesses.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Guess #</th>
              <th>Name</th>
              <th>Section</th>
              <th>Year</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {guesses.map((g, i) => {
              const comparison: ComparisonResult = compareGuess(
                g,
                secretMember
              );

              results.push(comparison);

              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td className={comparison.nameMatch}>{g.name}</td>
                  <td className={comparison.sectionMatch}>{g.section}</td>
                  <td className={comparison.yearMatch}>{g.year}</td>
                  <td className={comparison.roleMatch}>{g.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Game;
