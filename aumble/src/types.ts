//type for band member
  export type Guess = {
  auburnID: string;
  name: string;
  section: string;
  year: string;
  role: string;
};

//type for comparison checks
export type ComparisonResult = {
    nameMatch: string;
    sectionMatch: string;
    yearMatch: string;
    roleMatch: string;
    equal: boolean;
};