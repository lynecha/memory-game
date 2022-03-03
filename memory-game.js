"use strict";


/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);



/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */



function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let temp = document.createElement("div");
    temp.className = color;
    temp.addEventListener("click", function cardMatch() {
      handleCardClick(temp);
      
    });
    gameBoard.appendChild(temp);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  console.log(boardLock);
    card.style.backgroundColor = card.className;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.style.backgroundColor = "white";
  
}

/** Handle clicking on a card: this could be first-card or second-card. */

let hasFlippedCard = false;
let firstCard,secondCard;
let boardLock = false;

function handleCardClick(evt) {
  if (boardLock == false) {
    if (hasFlippedCard == false) {
      firstCard = evt;
      flipCard(evt);
      hasFlippedCard = true;
      return; 
    }
    if (hasFlippedCard == true) {
      if (evt === firstCard) {
        return;
      }
      secondCard = evt;
      flipCard(secondCard);
      boardLock = true;
      checkMatch(firstCard,secondCard);
    }
    return;
  }
}

function checkMatch (firstCard, secondCard) {
  if (firstCard.className == secondCard.className) {
    firstCard.style.pointerEvents = "none";
    secondCard.style.pointerEvents = "none";
    boardLock = false;
    hasFlippedCard = false;
    return;
  }
  else {
    setTimeout(function() {
      unFlipCard(firstCard);
      unFlipCard(secondCard);
      boardLock = false;
    }, FOUND_MATCH_WAIT_MSECS);
    hasFlippedCard = false;
    return;
  }
}


