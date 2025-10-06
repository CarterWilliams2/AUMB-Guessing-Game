import { describe, it, expect } from 'vitest';
import { compareGuess } from './compareGuess';
import { Guess, ComparisonResult } from "../types";


let guess1: Guess = {
    auburnID: "abc123",
    name: "John Doe",
    section: "Trumpet",
    year: "1",
    role: "Member",
}

let guess2: Guess = {
    auburnID: "def456",
    name: "Jane Doe",
    section: "Trumpet",
    year: "4",
    role: "Section Leader"
}

let guess3: Guess = {
    auburnID: "xyz321",
    name: "LeBron James",
    section: "Mellophone",
    year: "23",
    role: "Sunshine"
}

let guess4: Guess = {
    auburnID: "bgx654",
    name: "Wandale Robinson",
    section: "Clarinet",
    year: "67",
    role: "WR"
}

let guess5: Guess = {
    auburnID: "bws654",
    name: "Pop",
    section: "Clarinet",
    year: "1",
    role: "Member"
}

let guess6: Guess = {
    auburnID: "bws654",
    name: "Pop",
    section: "Clarinet",
    year: "2",
    role: "Member"
}

describe('compareGuess', () => {

    it("should return equal for exact matches", () => {
        let exactResult: ComparisonResult = compareGuess(guess1, guess1);
        expect(exactResult.equal).toEqual(true);
    });

    it("should have green for exact section matches", () => {
        let exactSection: ComparisonResult = compareGuess(guess1, guess2);
        expect(exactSection.sectionMatch).toEqual("green");
    });

    it("should have green for section family matches", () => {
        let similarFamilies: ComparisonResult = compareGuess(guess1, guess3);
        expect(similarFamilies.sectionMatch).toEqual("yellow");
    });

    it("should have gray for no section matches", () => {
        let dissimilarFamiles: ComparisonResult = compareGuess(guess1, guess4);
        expect(dissimilarFamiles.sectionMatch).toEqual("gray");
    });

    it("should have green for exact year matches", () => {
        let exactYear: ComparisonResult = compareGuess(guess1, guess5);
        expect(exactYear.yearMatch).toEqual("green");
    });

    it("should have yellow for similar year matches", () => {
        let similarYear: ComparisonResult = compareGuess(guess1, guess6);
        expect(similarYear.yearMatch).toEqual("yellow");
    });

    it("should have gray for dissimilar year matches", () => {
        let dissimilarYear: ComparisonResult = compareGuess(guess3, guess6);
        expect(dissimilarYear.yearMatch).toEqual("gray");
    });

     it("should have green for exact role matches", () => {
        let exactRole: ComparisonResult = compareGuess(guess1, guess6);
        expect(exactRole.roleMatch).toEqual("green");
    });

     it("should have green for similar role matches", () => {
        let similarSection: ComparisonResult = compareGuess(guess2, guess3);
        expect(similarSection.sectionMatch).toEqual("yellow");
    });

    it("should have gray for dissimilar role matches", () => {
        let dissimilarSection: ComparisonResult = compareGuess(guess1, guess2);
        expect(dissimilarSection.yearMatch).toEqual("gray");
    });
});