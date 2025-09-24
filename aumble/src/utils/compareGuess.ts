import { Guess, ComparisonResult } from "../types";
import { instrumentFamilies } from "./instrumentFamilies";

export function compareGuess(guess: Guess, answer: Guess) {
    let res: ComparisonResult = {
        nameMatch: "gray",
        sectionMatch: "gray",
        yearMatch: "gray",
        roleMatch: "gray",
        equal: false,
    };

    //some post-processing to get better variables to use
    const guess_section: string = guess.section.toLowerCase().replace(/ /g, "");
    const answer_section: string = answer.section.toLowerCase().replace(/ /g, "");
    const guess_year: number = parseInt(guess.year)
    const answer_year: number = parseInt(answer.year)
    const guess_role: string = guess.role.toLowerCase().replace(/ /g, "");
    const answer_role: string = answer.role.toLowerCase().replace(/ /g, "");

    //test if they are the same person
    if (guess.auburnID === answer.auburnID) {
        res.nameMatch = "green";
        res.sectionMatch = "green";
        res.yearMatch = "green";
        res.roleMatch = "green";
        res.equal = true;
    }

    //test for section similarity
    if (guess_section === answer_section) {
        res.sectionMatch = "green";
    }
    else if (instrumentFamilies[guess_section] === instrumentFamilies[answer_section]) {
        res.sectionMatch = "yellow";
    };

    //test for year similarity
    if (guess.year === answer.year) {
        res.yearMatch = "green";
    }
    else if (Math.abs(guess_year - answer_year) === 1) {
        res.yearMatch = "yellow";
    };

    //test for role similarity
    if (guess_role == answer_role) {
        res.roleMatch = "green";
    }
    else if (guess_role != "member" && answer_role != "member") {
        res.roleMatch = "yellow";
    }

    return res;

};