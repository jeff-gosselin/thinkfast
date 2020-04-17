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
