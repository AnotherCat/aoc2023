import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n");
  return lines.map((line) => {
    const parts = line.split(":")[1].trim().split("|");
    const winningNumbers = parts[0]
      .trim()
      .split(" ")
      .filter((a) => a !== "")
      .map((num) => {
        return parseInt(num.trim());
      });

    const ourNumbers = parts[1]
      .trim()
      .split(" ")
      .filter((a) => a !== "")
      .map((num) => {
        return parseInt(num.trim());
      });

    return {
      winning: winningNumbers,
      ours: ourNumbers,
    };
  });
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let total = 0;
  input.forEach((card) => {
    const matches = card.ours.filter((element) =>
      card.winning.includes(element),
    );
    if (matches.length > 0) {
      total += 1 * 2 ** (matches.length - 1);
    }
  });

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let total = 0;
  const cardmap: {
    [cardId: number]: {
      winning: number[];
      ours: number[];
      wins: number;
      id: number;
    };
  } = {};
  const cards = input.map((card, index) => {
    const matches = card.ours.filter((element) =>
      card.winning.includes(element),
    );
    cardmap[index + 1] = {
      ...card,
      wins: matches.length,
      id: index + 1,
    };
    return {
      ...card,
      wins: matches.length,
      id: index + 1,
    };
  });

  let totalCards = cards.length;
  while (cards.length > 0) {
    const card = cards.shift()!;
    for (let index = 1; index <= card.wins; index++) {
      cards.push(cardmap[card.id + index]);
      totalCards++;
    }
  }

  return totalCards;
};

const part2nd = (rawInput: string) => {
  const input = parseInput(rawInput);
  let total = 0;
  const cardmap: {
    [cardId: number]: {
      winning: number[];
      ours: number[];
      wins: number;
      id: number;
      currentCopies: number;
    };
  } = {};
  const cards = input.map((card, index) => {
    const matches = card.ours.filter((element) =>
      card.winning.includes(element),
    );
    cardmap[index + 1] = {
      ...card,
      wins: matches.length,
      id: index + 1,
      currentCopies: 1,
    };
    return {
      ...card,
      wins: matches.length,
      id: index + 1,
      currentCopies: 1,
    };
  });

  let totalCards = cards.length;
  cards.forEach((card, index) => {
    for (
      let additionalIndex = 1;
      additionalIndex <= card.wins;
      additionalIndex++
    ) {
      //console.log(card, index, additionalIndex);
      cards[index + additionalIndex].currentCopies += card.currentCopies;
      totalCards += card.currentCopies;
    }
  });

  return totalCards;
};
run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2nd,
  },
  trimTestInputs: true,
  //onlyTests: true,
});
