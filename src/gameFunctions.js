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
export const checkMatch = cardArray => {
  let cardsPicked = [];
  for (let card in gameCards) {
    if (cardArray.includes(card.id)) {
      cardsPicked.push(card.name);
    }
  }

  console.log(cardsPicked);

  if (cardsPicked[0] === cardsPicked[1]) {
    return true;
  } else {
    return false;
  }
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
export const cardsMatched = cardArray => {};

// Old functions
// const checkMatch = () => {
//   // checkes if 2 cards are selected and if not aborts
//   if (cardSelections.length !== 2) {
//     return;
//   } else if (cardSelections[0].name === cardSelections[1].name) {
//     console.log("Match!!");
//     // add points to player's score
//     // remove cards from the gameCards
//     setCardSelections([]);
//     return true;
//   } else {
//     console.log("No Match!!");
//     // hide the cards that were revealed
//     setCardSelections([]);
//     return false;
//   }
// };

// const cardSelected = (e, selectedCard) => {
//   // make it so same card can't be selected twice so id can't be the same
//   let picked = cardSelections.includes(selectedCard);
//   console.log("picked?", picked);

//   // Adds card to selection if less than 2 cards picked and won't allow for same card being picked twice.
//   if (!picked && cardSelections.length < 2) {
//     setCardSelections([...cardSelections, selectedCard]);
//   }
// };

// const selectedCardAction = e => {
//   setRevealCard(true);
//   cardSelected(e, gameCard);
// };
