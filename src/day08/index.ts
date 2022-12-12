import run from "aocrunner";

const sampleInput = `
30373
25512
65332
33549
35390
`;

interface TreeReducer {
  tree: { [key: string]: number[] };
}

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map((line) => line.split(""));

  const removeBoundaries = (index: number) =>
    index !== 0 && index !== Object.keys(tree).length - 1;

  const tree = input.reduce<TreeReducer>((tree, line, index) => {
    //parse through line
    return { ...tree, [index]: line };
  }, {} as TreeReducer);

  const gridSearch = (
    values: number[],
    reducerValue: number,
    reducerIndex: number,
  ) =>
    values.slice(0, reducerIndex).every((num) => num < reducerValue) ||
    values
      .slice(reducerIndex + 1, values.length)
      .every((num) => num < reducerValue);

  const treeReducer = (
    count: number,
    [key, value]: [string, number[]],
    i: number,
  ) => {
    if (!removeBoundaries(Number(key))) {
      count += Object.keys(tree).length;
    } else {
      count += value.reduce((c, v, index) => {
        const vert = Object.values(tree).map((x) => x[index]);

        (gridSearch(value, v, index) || gridSearch(vert, vert[i], i)) && c++;
        // if (i === 97 && index === 32) {
        //   console.log({
        //     value,
        //     leftSlice: value.slice(0, index),
        //     rightSlice: value.slice(index + 1, value.length),
        //     curCount: c,
        //     curValue: v,
        //     curIndex: index,
        //     searchresultHor: gridSearch(value, v, index),
        //     vert,
        //     currentVertVal: vert[i],
        //     topSlice: vert.slice(0, i),
        //     bottomSlice: vert.slice(i + 1, value.length),
        //     searchresultVir: gridSearch(vert, v, i),
        //     i,
        //   });
        // }
        return c;
      }, 0);
    }
    return count;
  };

  const horizontalCount = Object.entries(tree).reduce<number>(treeReducer, 0);

  console.log(horizontalCount);

  return horizontalCount;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map((line) => line.split(""));

  const removeBoundaries = (index: number) =>
    index !== 0 && index !== Object.keys(tree).length - 1;

  const tree = input.reduce<TreeReducer>((tree, line, index) => {
    //parse through line
    return { ...tree, [index]: line };
  }, {} as TreeReducer);

  const gridSearch = (
    values: number[],
    reducerValue: number,
    reducerIndex: number,
  ) => {
    const prevSlice = values.slice(0, reducerIndex);

    const postSlice = values.slice(reducerIndex + 1, values.length);

    const scenicOne = prevSlice
      .reverse()
      .findIndex((num) => num >= reducerValue);
    const scenicTwo = postSlice.findIndex((num) => num >= reducerValue);

    const finalScenicOne = scenicOne === -1 ? prevSlice.length : scenicOne + 1;
    const finalScenicTwo = scenicTwo === -1 ? postSlice.length : scenicTwo + 1;

    return [finalScenicOne, finalScenicTwo];
  };

  const treeReducer = (
    count: number,
    [key, value]: [string, number[]],
    i: number,
  ) => {
    if (removeBoundaries(Number(key))) {
      const scenicCalc = value.reduce((c, v, index) => {
        const vert = Object.values(tree).map((x) => x[index]);

        const [scenicLeft, scenicRight] = gridSearch(value, v, index);
        const [scenicUp, scenicDown] = gridSearch(vert, vert[i], i);

        const scenic = scenicLeft * scenicDown * scenicRight * scenicUp;
        // if (scenic > c) {
        //   console.dir(
        //     {
        //       value,
        //       leftSlice: value.slice(0, index),
        //       rightSlice: value.slice(index + 1, value.length),
        //       curCount: c,
        //       curValue: v,
        //       curIndex: index,
        //       searchresultHor: gridSearch(value, v, index),
        //       vert,
        //       currentVertVal: vert[i],
        //       topSlice: vert.slice(0, i),
        //       bottomSlice: vert.slice(i + 1, vert.length),
        //       searchresultVir: gridSearch(vert, v, i),
        //       i,
        //     },
        //     { depth: null },
        //   );
        // }
        return c > scenic ? c : scenic;
      }, 0);

      count = scenicCalc > count ? scenicCalc : count;
    }
    return count;
  };

  const horizontalCount = Object.entries(tree).reduce<number>(treeReducer, 0);

  console.log(horizontalCount);

  return horizontalCount;
};

run({
  part1: {
    tests: [
      {
        input: sampleInput,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sampleInput,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
