import run from "aocrunner";

const sampleInput = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

const parseInput = (rawInput: string) => rawInput.split("\n");

interface Directory {
  [key: string]: Directory | string | number;
}

interface TreeReducer {
  tree: Directory;
  location: string[];
}

const modifyTree = (
  tree: Directory,
  newKey: string,
  newValue: Directory | number,
  destination: string[],
  path: string[] = [],
) => {
  const newTree: Directory = Object.entries(tree).reduce(
    (newTree, [key, value]) => {
      const nextValue =
        typeof value === "object"
          ? modifyTree(value, newKey, newValue, destination, [...path, key])
          : value;
      return { ...newTree, [key]: nextValue };
    },
    {},
  );

  return destination.join("/") === path.join("/")
    ? { ...newTree, [newKey]: newValue }
    : newTree;
};

const regexStore = {
  skipLine: /\$ ls/,
  changeDir: /\$ cd \w+/,
  createDir: /dir \w+/,
  createFile: /\d+ .+/,
  leaveDir: /\$ cd \.\./,
  outerMostDir: /\$ cd \//,
};

const treeReducer = ({ tree, location }: TreeReducer, line: string) => {
  const skipLine = (line: string) => ({ tree, location });
  const leaveDir = () => ({ tree, location: location.slice(0, -1) });

  const outerMostDir = () => ({ tree, location: [] });

  const changeDir = (line: string) => {
    const match = line.match(/\$ cd (\w+)/);
    const dir = match ? match[1] : "";
    return { tree, location: [...location, dir] };
  };

  const createDir = (line: string) => {
    const match = line.match(/dir (\w+)/);
    const dir = match ? match[1] : "";
    const nextTree = modifyTree(tree, dir, {}, location);
    return { tree: nextTree, location };
  };

  const createFile = (line: string) => {
    const match = line.match(/(\d+) (.+)/);
    const [size, file] = match ? match.slice(1) : [];
    const nextTree = modifyTree(tree, file, Number(size), location);
    return { tree: nextTree, location };
  };

  const commandStore = [
    { expression: regexStore.skipLine, function: skipLine },
    { expression: regexStore.changeDir, function: changeDir },
    { expression: regexStore.createDir, function: createDir },
    { expression: regexStore.createFile, function: createFile },
    { expression: regexStore.leaveDir, function: leaveDir },
    { expression: regexStore.outerMostDir, function: outerMostDir },
  ];

  const commandFunction = commandStore.find(({ expression }) =>
    expression.test(line),
  )?.function;

  const command = commandFunction ? commandFunction : skipLine;

  return command(line);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const treeFromFile = input.reduce<TreeReducer>(treeReducer, {
    tree: {},
    location: [],
  } as TreeReducer).tree;

  const sizes: { [key: string]: number } = {};

  const dfs = (tree: Directory, path = "/") => {
    const size = Object.entries(tree).reduce<number>(
      (
        size: number,
        [dir, contents]: [string, Directory | number | string],
      ) => {
        const newSize: number =
          typeof contents === "object"
            ? dfs(contents, `${path}${dir}/`)
            : typeof contents === "number"
            ? contents
            : 0;
        return newSize + size;
      },
      0,
    );

    sizes[path] = size;
    return size;
  };

  dfs(treeFromFile);
  return Object.values(sizes)
    .filter((size) => size < 100000)
    .reduce((sum, num) => sum + num, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const treeFromFile = input.reduce<TreeReducer>(treeReducer, {
    tree: {},
    location: [],
  } as TreeReducer).tree;

  const sizes: { [key: string]: number } = {};

  const dfs = (tree: Directory, path = "/") => {
    const size = Object.entries(tree).reduce<number>(
      (
        size: number,
        [dir, contents]: [string, Directory | number | string],
      ) => {
        const newSize: number =
          typeof contents === "object"
            ? dfs(contents, `${path}${dir}/`)
            : typeof contents === "number"
            ? contents
            : 0;
        return newSize + size;
      },
      0,
    );

    sizes[path] = size;
    return size;
  };

  dfs(treeFromFile);

  const needToDelete = sizes["/"] - 40000000;
  const choicesToDelete = Object.values(sizes).filter(
    (size) => size >= needToDelete,
  );

  return Math.min(...choicesToDelete);
};

run({
  part1: {
    tests: [
      {
        input: sampleInput,
        expected: 95437,
      },
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
