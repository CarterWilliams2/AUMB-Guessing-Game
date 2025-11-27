import { Guess } from "../types.ts";

export function getDailyMember(members: Guess[]): Guess {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Chicago", 
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const parts = new Intl.DateTimeFormat("en-CA", options).formatToParts(now);
  const year = parts.find(p => p.type === "year")?.value;
  const month = parts.find(p => p.type === "month")?.value;
  const day = parts.find(p => p.type === "day")?.value;
  const dateString = `${year}-${month}-${day}`;

  if (dateString == '2025-11-27') {
    const special = members.find(m => m.name == "Ricky Whorms");
    if (!special) {
      return {
        auburnID: "",
        name: "",
        section: "",
        year: "",
        role: "" 
      }
    }
    return special;
  }

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash * 31 + dateString.charCodeAt(i)) % 100000;
  }

  const index = hash % members.length;
  return members[index];
}