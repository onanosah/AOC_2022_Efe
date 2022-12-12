import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const crateOne: string[] = [];
  const crateTwo: string[] = [];
  const crateThree: string[] = [];
  const crateFour: string[] = [];
  const crateFive: string[] = [];
  const crateSix: string[] = [];
  const crateSeven: string[] = [];
  const crateEight: string[] = [];
  const crateNine: string[] = [];

  const crateStore: { [key: number]: string[] } = {
    0: crateOne,
    1: crateTwo,
    2: crateThree,
    3: crateFour,
    4: crateFive,
    5: crateSix,
    6: crateSeven,
    7: crateEight,
    8: crateNine,
  };

  const evalMoves = (count: number, start: number, end: number) => {
    for (let i = 0; i < count; i++) {
      const move = crateStore[start - 1].pop();
      crateStore[end - 1].push(move ? move : "");
    }
  };

  const max = [];

  //read each line
  //for first 8 lines store crates
  input.split("\n").every((line, index) => {
    if (index <= 7) {
      let track = 0;
      for (let i = 0; i < line.length; i += 4) {
        const subString = line.substring(i, i + 3);
        if (subString !== "   ") {
          crateStore[track].push(subString);
        }
        track++;
      }
      return true;
    }
    return false;
  });

  for (const crate in crateStore) {
    crateStore[crate] = crateStore[crate].reverse();
  }
  // console.log(crateStore);

  input
    .split("\n")
    .filter((item, index) => index >= 10)
    .map((item) =>
      item
        .split(" ")
        .filter((i) => parseInt(i))
        .map((item) => parseInt(item)),
    )
    .forEach((item) => evalMoves(item[0], item[1], item[2]));

  for (const crate in crateStore) {
    max.push(crateStore[crate].pop());
  }

  return max
    .map((item) => {
      return item?.split("")[1];
    })
    .join("");
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const crateOne: string[] = [];
  const crateTwo: string[] = [];
  const crateThree: string[] = [];
  const crateFour: string[] = [];
  const crateFive: string[] = [];
  const crateSix: string[] = [];
  const crateSeven: string[] = [];
  const crateEight: string[] = [];
  const crateNine: string[] = [];

  console.log(input.split("\n\n"));

  const crateStore: { [key: number]: string[] } = {
    0: crateOne,
    1: crateTwo,
    2: crateThree,
    3: crateFour,
    4: crateFive,
    5: crateSix,
    6: crateSeven,
    7: crateEight,
    8: crateNine,
  };

  const evalMoves = (count: number, start: number, end: number) => {
    let move: string[] = [];
    for (let i = 0; i < count; i++) {
      const temp = crateStore[start - 1].pop();
      move.push(temp ? temp : "");
    }
    crateStore[end - 1] = crateStore[end - 1].concat(
      move ? move.reverse() : [],
    );
  };

  const max = [];

  //read each line
  //for first 8 lines store crates
  input.split("\n").every((line, index) => {
    if (index <= 7) {
      let track = 0;
      for (let i = 0; i < line.length; i += 4) {
        const subString = line.substring(i, i + 3);
        if (subString !== "   ") {
          crateStore[track].push(subString);
        }
        track++;
      }
      return true;
    }
    return false;
  });

  for (const crate in crateStore) {
    crateStore[crate] = crateStore[crate].reverse();
  }

  input
    .split("\n")
    .filter((_, index) => index >= 10)
    .map((item) =>
      item
        .split(" ")
        .filter((i) => parseInt(i))
        .map((item) => parseInt(item)),
    )
    .forEach((item) => evalMoves(item[0], item[1], item[2]));

  for (const crate in crateStore) {
    max.push(crateStore[crate].pop());
  }

  return max
    .map((item) => {
      return item?.split("")[1];
    })
    .join("");
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
