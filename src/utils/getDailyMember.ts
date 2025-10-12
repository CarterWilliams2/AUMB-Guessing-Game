import { Guess } from "../types.ts";

export function getDailyMember(members: Guess[]): Guess {

  const today = new Date();
  const dateString = today.toISOString().split("T")[0];

  
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash * 31 + dateString.charCodeAt(i)) % 100000;
  }

  
  const index = hash % members.length;
  return members[index];
}