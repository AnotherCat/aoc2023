import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((line) => line.split(""));
};

const testValue = (value: string): boolean => {
  const num = parseInt(value);
  if (isNaN(num) && value !== ".") {
    return true;
  }
  return false;
};

const hasAround = (input: string[][], row: number, column: number): boolean => {
  const values: string[] = [];
  const rowValue = input[row];
  if (row > 0) {
    if (column > 0) {
      values.push(input[row - 1][column - 1]);
    }
    values.push(input[row - 1][column]);
    if (column < rowValue.length - 1) {
      values.push(input[row - 1][column + 1]);
    }
  }
  if (column > 0) {
    values.push(input[row][column - 1]);
  }
  if (column < rowValue.length - 1) {
    values.push(input[row][column + 1]);
  }
  if (row < input.length - 1) {
    if (column > 0) {
      values.push(input[row + 1][column - 1]);
    }
    values.push(input[row + 1][column]);
    if (column < rowValue.length - 1) {
      values.push(input[row + 1][column + 1]);
    }
  }
  return !values.every((value) => !testValue(value));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let totalSum = 0;

  let currNum = "";
  let counts = false;
  input.forEach((line, row) => {
    line.forEach((char, column) => {
      const num = parseInt(char);
      if (!isNaN(num)) {
        currNum = currNum.concat(char);
        if (!counts) {
          if (hasAround(input, row, column)) {
            counts = true;
          }
        }
      } else if (counts) {
        const num = parseInt(currNum);
        currNum = "";
        totalSum += num;
        counts = false;
      } else {
        //// console.log(currNum);
        currNum = "";
      }
    });
  });

  return totalSum;
};

interface Num {
  row: number;
  startColumn: number;
  endColumn: number;
  value: number;
}

interface Gear {
  row: number;
  column: number;
  nums: Num[];
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let gears: Gear[] = [];

  input.forEach((line, row) => {
    line.forEach((char, column) => {
      if (char === "*") {
        const values: string[] = [];
        const rowValue = input[row];
        if (row > 0) {
          if (column > 0) {
            values.push(input[row - 1][column - 1]);
          }
          values.push(input[row - 1][column]);
          if (column < rowValue.length - 1) {
            values.push(input[row - 1][column + 1]);
          }
        }
        if (column > 0) {
          values.push(input[row][column - 1]);
        }
        if (column < rowValue.length - 1) {
          values.push(input[row][column + 1]);
        }
        if (row < input.length - 1) {
          if (column > 0) {
            values.push(input[row + 1][column - 1]);
          }
          values.push(input[row + 1][column]);
          if (column < rowValue.length - 1) {
            values.push(input[row + 1][column + 1]);
          }
        }
        // console.log(values);
        const isGear =
          values.filter((value) => {
            return !isNaN(parseInt(value));
          }).length >= 2;
        if (isGear) {
          gears.push({
            row,
            column,
            nums: [],
          });
        }
      }
    });
  });

  let currNum = "";
  let startIndex = 0;
  let startRow = 0;
  let endIndex = 0;
  input.forEach((line, row) => {
    line.forEach((char, column) => {
      const num = parseInt(char);
      if (!isNaN(num)) {
        if (currNum === "") {
          startIndex = column;
          startRow = row;
        }
        currNum = currNum.concat(char);
      } else if (currNum !== "") {
        endIndex = column - 1;
        const num = parseInt(currNum);

        // console.log("EHHHHH", row, column, startIndex, endIndex, currNum);
        currNum = "";
        gears.forEach((gear) => {
          if (
            gear.row <= startRow + 1 &&
            gear.row >= startRow - 1 &&
            gear.column >= startIndex - 1 &&
            gear.column <= endIndex + 1
          ) {
            // console.log("AHHHH", row, column);
            gear.nums.push({
              startColumn: startIndex,
              endColumn: endIndex,
              value: num,
              row: startRow,
            });
          }
        });
      }
    });
    if (currNum !== "") {
      endIndex = line.length - 1;
      const num = parseInt(currNum);

      // console.log("EHHHHH", row, column, startIndex, endIndex, currNum);
      currNum = "";
      gears.forEach((gear) => {
        if (
          gear.row <= startRow + 1 &&
          gear.row >= startRow - 1 &&
          gear.column >= startIndex - 1 &&
          gear.column <= endIndex + 1
        ) {
          // console.log("AHHHH", row, column);
          gear.nums.push({
            startColumn: startIndex,
            endColumn: endIndex,
            value: num,
            row: startRow,
          });
        }
      });
    }
  });
  //console.log(JSON.stringify(gears, undefined, 2));
  gears = gears.filter((gear) => {
    return gear.nums.length >= 2;
  });

  return gears.reduce((prev, gear) => {
    return (
      prev +
      gear.nums.reduce((prevNum, num) => {
        return prevNum * num.value;
      }, 1)
    );
  }, 0);
  return;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
      {
        input: `........
.24..4..
......*.`,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 467835,
      },
      {
        input: `........
.24..4..
......*.`,
        expected: 0,
      },
      {
        input: `
...377..&783../.................................9...........855*......940..463................-.........................844.*....@......679.
......*...........197.261.....817..336.759............&742......548.......&........748......844.............#.......&........254...169..*...
.......36....368.*...............*....*.........*..88......%866.......135.........*..................515.682.....114...%...........*.....768`,
        expected: 1258608,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
