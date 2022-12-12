import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const calcFullOverlap = (
  a: number,
  b: number,
  c: number,
  d: number,
): boolean => {
  if ((a >= c && b <= d) || (c >= a && d <= b)) {
    return true;
  }
  return false;
};
const calcOverlap = (a: number, b: number, c: number, d: number): boolean => {
  if ((c <= b && c >= a) || (a >= c && a <= d)) {
    return true;
  }
  return false;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  //read each line
  const inputBreakDown = input.split("\n");
  let count = 0;
  const overlapStore: { a: number; b: number; c: number; d: number }[] = [];

  inputBreakDown.forEach((line) => {
    const section = line.split(",");
    const rangeOne = section[0].split("-");
    const rangeTwo = section[1].split("-");

    const ranges = {
      a: parseInt(rangeOne[0]),
      b: parseInt(rangeOne[1]),
      c: parseInt(rangeTwo[0]),
      d: parseInt(rangeTwo[1]),
    };

    if (calcFullOverlap(ranges.a, ranges.b, ranges.c, ranges.d)) {
      count++;
    }
  });

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputBreakDown = input.split("\n");
  let count = 0;
  const overlapStore: { a: number; b: number; c: number; d: number }[] = [];

  inputBreakDown.forEach((line) => {
    const section = line.split(",");
    const rangeOne = section[0].split("-");
    const rangeTwo = section[1].split("-");

    const ranges = {
      a: parseInt(rangeOne[0]),
      b: parseInt(rangeOne[1]),
      c: parseInt(rangeTwo[0]),
      d: parseInt(rangeTwo[1]),
    };

    if (calcOverlap(ranges.a, ranges.b, ranges.c, ranges.d)) {
      count++;
    }
  });

  return count;
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
