export type WordleRequestItem = {
    word: string;
    clue: string;
  };
  
  export type WordleRequest = WordleRequestItem[];
  
  export type WordleResponse = {
    guess: string;
  };