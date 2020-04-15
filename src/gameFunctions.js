// Shuffles cards for the grid
export const shuffleCards = cardsArr => {
  let cards = cardsArr.slice(0);
  let gridPos, temp;

  for (let i = cards.length - 1; i > 0; i--) {
    gridPos = Math.floor(Math.random() * (i + 1));
    temp = cards[i];
    cards[i] = cards[gridPos];
    cards[gridPos] = temp;
  }
  return cards;
};

// Checks if 2 selected cards match
export const checkMatch = id => {
  console.log("checked");
};

// prevents same card from being clicked twice
export const preventSelectingTwice = id => {
  console.log("checked");
};

// Cards did not match so flip them back over
export const flipCardsBackOver = id => {
  console.log("checked");
};

// Cqrds matched so disable them
export const cardsMatched = id => {
  console.log("checked");
};
