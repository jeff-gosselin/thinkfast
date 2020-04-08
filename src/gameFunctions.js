// Randomizes cards for the grid
export function cardRandomizer(cardsArr) {
  let gridPos, temp;

  for (let i = cardsArr.length - 1; i > 0; i--) {
    gridPos = Math.floor(Math.random() * (i + 1));
    temp = cardsArr[i];
    cardsArr[i] = cardsArr[gridPos];
    cardsArr[gridPos] = temp;
  }

  return cardsArr;
}
