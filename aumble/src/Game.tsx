import { SetStateAction, useState, useEffect } from "react";
import "./Game.css";
import { ComparisonResult, Guess } from "./types";
import { compareGuess } from "./utils/compareGuess";
import members from "./members.json";
import useDebounce from "./hooks/useDebounce";

function Game() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [allMembers] = useState(members);
  const memberNames = allMembers.map((m) => m.name);
  const [filteredMembers, setFilteredMembers] = useState<string[]>(memberNames);
  const debouncedGuess = useDebounce(guess, 200);

  const secretMember: Guess = allMembers.find(
    (m) => m.name === "Brendan Holley"
  ) ?? {
    name: "Unknown",
    section: "",
    year: "",
    role: "",
    auburnID: "",
  };

  // not using backend for now
  // useEffect(() => {
  //   fetch("http://localhost:3001/members")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Fetched members:", data);
  //       setMembers(data);
  //     })
  //     .catch((err) => console.error("Error fetching members:", err));
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  useEffect(() => {
    const results = memberNames.filter((name) =>
      name.toLowerCase().includes(debouncedGuess.toLowerCase())
    );
    setFilteredMembers(results);
  }, [debouncedGuess]);

  const handleSubmitGuess = () => {
    if (!guess.trim()) return;

    const found = allMembers.find(
      (m) => m.name.toLowerCase() === guess.toLowerCase()
    );

    if (found) {
      setGuesses([...guesses, found]);
    } else {
      setGuesses([
        ...guesses,
        { name: guess, section: "", year: "", role: "", auburnID: "" },
      ]);
    }

    setGuess("");
  };

  const lastComparison =
    guesses.length > 0
      ? compareGuess(guesses[guesses.length - 1], secretMember)
      : null;

  return (
    <div className="game-container">
      {lastComparison?.equal ? (
        <h1>You guessed the daily secret member!</h1>
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
