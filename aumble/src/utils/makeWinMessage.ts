import { ComparisonResult } from "../types";

export function makeWinMessage(guesses: ComparisonResult[]) {
  let output: string = "";

  for (let i = 0; i < guesses.length; i++) {
    let current = guesses[i];

    //check for name similarity
    if (current.nameMatch === "green") {
      output += "🟩";
    } else {
      output += "⬜️";
    }

    //check for section similarity
    if (current.sectionMatch === "green") {
      output += "🟩";
    } else if (current.sectionMatch === "yellow") {
      output += "🟨";
    } else {
      output += "⬜️";
    }

    //check for year match
    if (current.yearMatch === "green") {
      output += "🟩";
    } else if (current.yearMatch === "yellow") {
      output += "🟨";
    } else {
      output += "⬜️";
    }

    //check for role match
    if (current.roleMatch === "green") {
      output += "🟩";
    } else if (current.roleMatch === "yellow") {
      output += "🟨";
    } else {
      output += "⬜️";
    }

    if (!current.equal) {
      output += "\n";
    }

  }


  return output;
}
