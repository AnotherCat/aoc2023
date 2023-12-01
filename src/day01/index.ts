import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  let totalValue = 0;
  lines.forEach((line) => {
    const characters = line.split("");
    const numbers = characters.filter((c) => {
      const number = parseInt(c);
      if (!isNaN(number)) {
        return true;
      }
    });
    const combined = numbers[0] + numbers[numbers.length - 1];
    totalValue += parseInt(combined);
  });

  return totalValue;
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);

  while (true) {
    const matching = input.match(
      /one|two|three|four|five|six|seven|eight|nine/,
    );

    if (matching === null) {
      break;
    }

    const number = matching[0];
    let newstr = "";
    switch (number) {
      case "one":
        newstr = "on1e";
        break;
      case "two":
        newstr = "t2wo";
        break;
      case "three":
        newstr = "thr3ee";
        break;
      case "four":
        newstr = "fou4r";
        break;
      case "five":
        newstr = "fiv5e";
        break;
      case "six":
        newstr = "si6x";
        break;
      case "seven":
        newstr = "sev7en";
        break;
      case "eight":
        newstr = "eig8ht";
        break;
      case "nine":
        newstr = "ni9ne";
        break;
    }
    input = input.replace(number as unknown as string, newstr);
  }

  const lines = input.split("\n");

  let totalValue = 0;
  lines.forEach((line) => {
    const characters = line.split("");
    const numbers = characters.filter((c) => {
      const number = parseInt(c);
      if (!isNaN(number)) {
        return true;
      }
    });
    const combined = numbers[0] + numbers[numbers.length - 1];
    totalValue += parseInt(combined);
  });

  return totalValue;
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
         eightwothree
         abcone2threexyz
         xtwone3four
         4nineeightseven2
         zoneight234
         7pqrstsixteen`,
        expected: 281,
      },
      {
        input: `twoneight
        nineighttwo`,
        expected: 120,
      },
      {
        input: `twoneight
        nineighttwo
        5eightwo`,
        expected: 172,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
