import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("");

const checkDuplicate = (arr: string[]) => {
  return new Set(arr).size !== arr.length;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  for (let i = 0; i < input.length; i++) {
    if (!checkDuplicate(input.slice(i, i + 4))) {
      return i + 4;
    }
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  for (let i = 0; i < input.length; i++) {
    if (!checkDuplicate(input.slice(i, i + 14))) {
      return i + 14;
    }
  }
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
