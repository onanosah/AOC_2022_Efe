import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const scores = {
  win: 6,
  lose: 0,
  draw: 3,
};

const choices = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const calcMove = (move: string) => {
  switch (move) {
    case "A X":
      return choices.ROCK + scores.draw;
      break;
    case "A Y":
      return choices.PAPER + scores.win;
      break;
    case "A Z":
      return choices.SCISSORS + scores.lose;
      break;
    case "B X":
      return choices.ROCK + scores.lose;
      break;
    case "B Y":
      return choices.PAPER + scores.draw;
      break;
    case "B Z":
      return choices.SCISSORS + scores.win;
      break;
    case "C X":
      return choices.ROCK + scores.win;
      break;
    case "C Y":
      return choices.PAPER + scores.lose;
      break;
    case "C Z":
      return choices.SCISSORS + scores.draw;
      break;
  }

  return 0;
};

const calcResult = (move: string) => {
  switch (move) {
    case "A X":
      return choices.SCISSORS + scores.lose;
      break;
    case "A Y":
      return choices.ROCK + scores.draw;
      break;
    case "A Z":
      return choices.PAPER + scores.win;
      break;
    case "B X":
      return choices.ROCK + scores.lose;
      break;
    case "B Y":
      return choices.PAPER + scores.draw;
      break;
    case "B Z":
      return choices.SCISSORS + scores.win;
      break;
    case "C X":
      return choices.PAPER + scores.lose;
      break;
    case "C Y":
      return choices.SCISSORS + scores.draw;
      break;
    case "C Z":
      return choices.ROCK + scores.win;
      break;
  }

  return 0;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const testRegex = input.split("\n");

  let score = 0;
  const scoreSheet: number[] = [];

  testRegex.forEach((move, index) => {
    scoreSheet[index] = calcMove(move);
  });

  const sol = scoreSheet.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  // console.log(sol);

  return sol;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const testRegex = input.split("\n");
  const scoreSheet: number[] = [];

  testRegex.forEach((move, index) => {
    scoreSheet[index] = calcResult(move);
  });

  const sol = scoreSheet.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return sol;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
