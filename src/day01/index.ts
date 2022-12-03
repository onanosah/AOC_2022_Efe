import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let ans = {
    value: 0,
    index: 0,
  };

  const testRegex = input.split("\n\n");

  for (let i = 0; i < testRegex.length; i++) {
    let temp = testRegex[i].split("\n");

    const init = 0;
    const sumWithInitial = temp.reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue),
      init,
    );

    if (sumWithInitial > ans.value) ans = { ...ans, value: sumWithInitial };
  }

  // console.log(ans);
  return ans.value;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const init = 0;
  // let ans = {
  //   value: 0,
  //   index: 0,
  // };

  const testRegex = input.split("\n\n");
  let tempContainer = [];

  for (let i = 0; i < testRegex.length; i++) {
    let temp = testRegex[i].split("\n");

    const sumWithInitial = temp.reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue),
      init,
    );

    // console.log(sumWithInitial, i);

    // if (sumWithInitial > ans.value) ans = { ...ans, value: sumWithInitial };
    tempContainer[i] = sumWithInitial;
  }

  // console.log(testRegex.length);
  // console.log(tempContainer.sort().reverse());
  const sol = tempContainer
    .sort()
    .reverse()
    .splice(0, 3)
    .reduce((accumulator, currentValue) => accumulator + currentValue, init);
  console.log(sol);
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
