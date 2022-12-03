import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const calcValue = (item: string): number => {
  if (item === item.toUpperCase()) {
    return (item.charCodeAt(0) % 64) + 26;
  } else if (item === item.toLowerCase()) {
    return item.charCodeAt(0) % 96;
  }

  return 0;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  //store duplicate value
  const duplicatePriority: string[] = [];

  //break down input
  const inputBreakDown = input.split("\n");

  //split each 'rucksack' into 2 strings
  //find the single duplicate item
  //return its value
  inputBreakDown.forEach((rucksack, index) => {
    const compartmentOne = rucksack.slice(0, rucksack.length / 2).split("");
    const compartmentTwo = rucksack
      .slice(rucksack.length / 2, rucksack.length)
      .split("");

    compartmentOne.every((item) => {
      if (compartmentTwo.includes(item)) {
        duplicatePriority[index] = item;
        return false;
      }

      return true;
    });
  });

  return duplicatePriority
    .map((item) => calcValue(item))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  //store duplicate value
  const duplicatePriority: string[] = [];

  //break down input
  const inputBreakDown = input.split("\n");

  // console.log(inputBreakDown);

  //find the single duplicate item
  //return its value

  for (let i = 0; i < inputBreakDown.length; i += 3) {
    const rucksackOne = inputBreakDown[i].split("");
    const rucksackTwo = inputBreakDown[i + 1].split("");
    const rucksackThree = inputBreakDown[i + 2].split("");

    rucksackOne.every((item) => {
      if (rucksackTwo.includes(item) && rucksackThree.includes(item)) {
        duplicatePriority[i] = item;
        return false;
      }

      return true;
    });
  }

  // console.log(duplicatePriority);
  // inputBreakDown.forEach((rucksack, index) => {
  //   const compartmentOne = rucksack.slice(0, rucksack.length / 2).split("");
  //   const compartmentTwo = rucksack
  //     .slice(rucksack.length / 2, rucksack.length)
  //     .split("");

  //   compartmentOne.every((item) => {
  //     if (compartmentTwo.includes(item)) {
  //       duplicatePriority[index] = item;
  //       return false;
  //     }

  //     return true;
  //   });
  // });

  return duplicatePriority
    .map((item) => calcValue(item))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
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
