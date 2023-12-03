import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const maxValues = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const numbers = lines.map((game) => {
    let isValid = true;
    const [first, second] = game.split(": ");
    const id = parseInt(first.split(" ")[1]);
    const sets = second.split(";");
    sets.forEach((set) => {
      const colors = set.split(", ");
      const numofcolors = {
        red: 0,
        green: 0,
        blue: 0,
      };
      colors.forEach((color) => {
        const [number, name] = color.trimStart().split(" ");

        const amount = parseInt(number);
        numofcolors[name as "blue" | "red" | "green"] += amount;
      });
      if (
        numofcolors.blue > maxValues.blue ||
        numofcolors.green > maxValues.green ||
        numofcolors.red > maxValues.red
      ) {
        isValid = false;
      }
    });
    if (isValid) {
      return id;
    } else {
      return 0;
    }
  });

  return numbers.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const numbers = lines.map((game) => {
    let isValid = true;
    const [first, second] = game.split(": ");
    const id = parseInt(first.split(" ")[1]);
    const sets = second.split(";");
    const maxOfColors = {
      red: 0,
      green: 0,
      blue: 0,
    };
    sets.forEach((set) => {
      const colors = set.split(", ");

      colors.forEach((color) => {
        const [number, name] = color.trimStart().split(" ");

        const amount = parseInt(number);
        if (maxOfColors[name as "blue" | "red" | "green"] < amount) {
          maxOfColors[name as "blue" | "red" | "green"] = amount;
        }
      });
    });
    return maxOfColors.blue * maxOfColors.green * maxOfColors.red;
  });
  return numbers.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  //onlyTests: true,
});
