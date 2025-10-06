import { describe, it, expect } from 'vitest';
import { makeWinMessage } from './makeWinMessage';
import { ComparisonResult } from '../types';

let guesses: ComparisonResult[] = [
    {
        nameMatch: "gray",
        sectionMatch: "gray",
        yearMatch: "gray",
        roleMatch: "gray",
        equal: false
    },
    {
        nameMatch: "gray",
        sectionMatch: "yellow",
        yearMatch: "yellow",
        roleMatch: "yellow",
        equal: false
    },
    {
        nameMatch: "green",
        sectionMatch: "green",
        yearMatch: "green",
        roleMatch: "green",
        equal: true
    }
]

describe("make win message", () => {
    it("should handle making a winning message with gray, yellow, and green squares", () => {
        let result: string = makeWinMessage(guesses);
        let answer: string = ""
        answer += "⬜️⬜️⬜️⬜️"
        answer += "\n"
        answer += "⬜️🟨🟨🟨"
        answer += "\n"
        answer += "🟩🟩🟩🟩"
        expect(result).toEqual(answer);
    });
});