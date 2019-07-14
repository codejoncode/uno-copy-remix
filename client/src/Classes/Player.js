const SKIP = 10;
const REVERSE = 11;
const DRAW2 = 12;
const WILD = 13;
const DRAW4 = 14;
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.cardsLeft = 0;
    this.gatherForPlay = [];
    this.playerTopCard = null;
    this.countUpOrDown = false;
    this.countingDistinct = 0;
    this.indexCache = [];
    this.isCountingPossible = false;
    this.error = null; // visual to the player themselves only.
    this.chooseColor = null;
  }

  addToPlayersHand(card) {
    this.hand.push(card);
    this.cardsLeft = this.hand.length;
    this.checkForCount();
  }
  checkForCount() {
    if (this.hand.length >= 3) {
      const cache = {};
      //build the cache every time we add a card
      for (let card of this.hand) {
        // only if its not a 10 11 12 13 or 14
        if (card.cardValue >= 0 && card.cardValue <= 9) {
          cache[card.cardValue] = card.uniqueNumber;
        }
      }
      //now loop back and check if three distinct numbers are available
      for (let card of this.hand) {
        if (
          (card.cardValue - 1 in cache && card.cardValue - 2 in cache) ||
          (card.cardValue + 1 in cache && card.cardValue + 2 in cache)
        ) {
          console.log("Counting is possible for this hand");
          this.isCountingPossible = true;
        }
      }
    }
  }

  organizePlayersHand(type) {
    //sort the players hand based on current color,
    if (type === "color") {
    }
    //sort the players hand based on type/ number ,
    else if (type === "number") {
    }
    //sort the players hand from least to greatest,
    else if (type === "least") {
    }
    //sort the players hand from greatest to least
    else if (type === "greatest") {
    }
  }
  placeCardInPosition(card, index) {
    this.gatherForPlay.push(card);
    this.playerTopCard = card;
    this.indexCache.push(index);
  }

  /**
   * Purpose of this function is to keep code dry since many of the same things are considred  just need to change the topCard from the games topCard to the players top card
   * this is depending on if gatherForPlay has a length of 0 use game top card if greater than 0 use players top card but this is called in the gather players cards function
   * this done in the mainGamePlay switch statment
   */
  gatherPlayersCards(
    indexArray,
    topCard,
    drawFlag = false,
    currentColor = null
  ) {
    /**
     * draw flag is false by default  so before gathering players cards it will be called to check if the drawTotal is > than zero
     * The first check is to see if the user  has a draw.
     */
    //does the user have a draw?
    console.log("indexCache");
    console.log(this.indexCache);
    console.log("gather for play");
    console.log(this.gatherForPlay);
    console.log(`The current color is ${currentColor}`)

    this.error = null; //take away any errors if present
    if (this.indexCache.includes(indexArray) === false) {
      const card = this.hand[indexArray];
      console.log("card attempting to gather for play");
      console.log(card); 
      //now check if the drawFlag has been raised
      if (drawFlag === true) {
        console.log("draw flag true")
        //user is required to enter a draw or pick up so check that they have a draw or force automatic pickup.
        let userHasADraw = false;
        for (let card of this.hand) {
          if (card.cardValue === DRAW2 || card.cardValue === DRAW4) {
            userHasADraw = true;
          }
        }
        if (userHasADraw === false) {
          // user is forced to pick up cards and their turn has ended.
          //return out of here
          return [true, "User is forced to pick up", "pickup"];
        } else {
          //this code should be dry as it will be repeated each time a user is gathering a card
          this.placeCardInPosition(card, indexArray);
        }
      } //end of top condition
      //this is so that the topCard received is considered in comparision
      else {
        console.log("NO draw flag is present consider other things");
        console.log(this.gatherForPlay);
        console.log(this.indexCache);
        //now check if the card.color matches the current color this should help with wild or draw 4's are on top and the color has been selected
        if (this.gatherForPlay.length === 0 && card.color === currentColor) {
          // only care about currentColor if gatherForPlay is empty
          this.placeCardInPosition(card, indexArray);
        } else if (card.cardValue === topCard.cardValue) {
          this.placeCardInPosition(card, indexArray);
        }
        //now check four possible count
        else if (this.isCountingPossible && card.countable) {
          //now check if the matches take place but only if the topCard is countable
          if (topCard.countable) {
            // need 9 8 7   or a 0 9 8 7 or 1 0 9 etc
            // the value 0 can also be used as a 10
            let upOneValue;
            let downOneValue;
            //check if  the card is a 1
            switch (topCard.cardValue) {
              case 0:
                upOneValue = 1;
                downOneValue = 9;
                break;
              case 1:
                upOneValue = 2;
                downOneValue = 0;
                break;
              case 8:
                upOneValue = 9;
                downOneValue = 7;
                break;
              case 9:
                upOneValue = 0;
                downOneValue = 9; 
              default:
                upOneValue = topCard.cardValue + 1;
                downOneValue = topCard.cardValue - 1;
                break;
            }

            if (
              card.cardValue === upOneValue ||
              card.cardValue === downOneValue
            ) {
              this.countUpOrDown = true;
              this.placeCardInPosition(card, indexArray);
            }
            //now the above is all the potentials  but another check has to be done the values above cannot be greater than 9 and cannot be less than 0;
          }
        } // if the user has a wild or draw 4
        else if (card.cardValue === WILD || card.cardValue === DRAW4) {
          console.log("Place this on top wild or draw 4")
          this.placeCardInPosition(card, indexArray);
        }
        //draw2 are covered in color and value but currently are not covered if a draw4 is on top and user places a drw 2  need option for this.
        else if (topCard.cardValue === DRAW4 && card.cardValue === DRAW2) {
          this.placeCardInPosition(card, indexArray);
        } else {
          this.error = "That move is not valid"; 
          console.log(this.error);
        }
      } 
    } else {
      //may want to update to the player letting the know the move is invalid
      this.error = "Card already in play";
      console.log(this.error); 
      return; /// nothing more to do
    }
  }

  removeCardsPlayingFromHand() {
    const newHand = [];
    for (let c = 0; c < this.hand.length; c++) {
      if (this.indexCache.includes(c) === false) {
        newHand.push(this.hand[c]);
      }
    }
    this.hand = newHand;
    this.cardsLeft = this.hand.length;
    this.resetBackToPrevious();
    this.checkForCount();
  }

  resetBackToPrevious() {
    //if an error occurred reset the hand
    this.indexCache = [];
    this.gatherForPlay = [];
    this.playerTopCard = null;
    this.countUpOrDown = false;
    this.countingDistinct = 0;
    this.error = null;
  }

  playTurn() {
    //playArray should be an array even if its only one card.
    // should return false if no error is present or true if an error is present along with message so return an array
    if (this.gatherForPlay.length) {
      const gatheredCardsForPlay = [...this.gatherForPlay];

      this.removeCardsPlayingFromHand();
      return [false, gatheredCardsForPlay];
      //}
    } else {
      this.resetBackToPrevious(); // though shouldn't be needed if user didn't select a card everything should be at the begining stage.
      return [true, "Select a card to play"];
    }
  }
  removeFromPlayersPlay(indexToRemove) {
    // const newPlay = [];
    // const cardToFindIndex = this.gatherForPlay[indexToRemove];// this is for the this.indexCache removal
    // for(let index = 0; index < this.gatherForPlay.length; index ++)
    // {
    //   if(index !== indexToRemove){
    //     newPlay.push(this.gatherForPlay[index]);
    //   }
    // }

    // this.gatherForPlay = newPlay;
    // const newIndexs = [];
    // let indexInHand = null;
    // for (let index = 0; index < this.hand.length;  index++){
    //    const card = this.hand[index];
    //    if (cardToFindIndex.uniqueNumber === card.uniqueNumber){
    //     indexInHand = index;
    //     break; // found the index to remove from this.indexCache
    //    }
    // }
    // for (let index = 0; index < this.indexCache.length; index++){
    //   const indexValue =  this.indexCache[index];
    //   if(indexValue !== indexInHand){
    //     newIndexs.push(indexValue);
    //   }
    // }
    // this.indexCache = newIndexs;
    this.gatherForPlay = [];
    this.indexCache = [];
  }
}

export default Player;

// if (
//   this.playerTopCard &&
//   // (drawFlag === true ||
//   //   this.playerTopCard.cardValue === DRAW2 ||
//   //   this.playerTopCard === DRAW4)
//   drawFlag === true
// ) {
//   let userHasADraw = false;
//   for (let card of this.hand) {
//     if (card.cardValue === DRAW2 || card.cardValue === DRAW4) {
//       userHasADraw = true;
//     }
//   }
//   if (userHasADraw === false) {
//     // user is forced to pick up cards and their turn has ended.
//     //return out of here
//     return [true, "User is forced to pick up", "pickup"];
//   } else {
//     const card = this.hand[indexArray];
//     if (card.cardValue === DRAW2 || card.cardValue === DRAW4) {
//       //user has the draw 2 or draw four and is prepared to fire it.f
//       if (this.indexCache.incluces(indexArray) === false) {
//         this.gatherForPlay.push(card);
//         this.playerTopCard = card;
//         this.indexCache.push(indexArray);
//       }
//       //return out   confirmation else where will confirm user wants to play or add cards.
//     }
//   }
// }

// //this will be an array of indexs to take from the players hand
// const card = this.hand[indexArray];
// //only check if the gatherForPlay is empty
// if (this.gatherForPlay.length === 0) {
//   //a check is done on the topCard of the deck which should be the second paramater  moving forward the check will be done on the users topCard / last card  put on pile
//   if (
//     card.color === topCard.color ||
//     card.cardValue === topCard.cardValue ||
//     card.cardValue >= WILD
//   ) {
//     if (this.indexCache.includes(indexArray) === false) {
//       // avoid duplicates not very dry though
//       this.gatherForPlay.push(card);
//       this.playerTopCard = card;
//       this.indexCache.push(indexArray);
//     }
//   } else if (card.color === currentColor){
//     this.playerTopCard = card;
//     this.indexCache.push(indexArray);
//     this.gatherForPlay.push(card);
//   }else if (
//     this.isCountingPossible &&
//     (card.cardValue === topCard.cardValue - 1 ||
//       card.cardValue === topCard.cardValue + 1)
//   ) {
//     console.log("potential count play");
//     if (
//       this.playerTopCard &&
//       this.playerTopCard.cardValue !== WILD &&
//       this.playerTopCard.cardValue !== SKIP &&
//       this.playerTopCard.cardValue !== REVERSE &&
//       this.playerTopCard.cardValue !== DRAW2 &&
//       this.playerTopCard.cardValue !== DRAW4
//     ) {
//       // CAN'T COUNT UP OR DOWN USING WILDS REVERSES OR DRAWS  OR SKIPS
//       //countup or down has been triggered
//       console.log("defintely a count play");
//       if (this.indexCache.includes(indexArray) === false) {
//         this.gatherForPlay.push(card);
//         this.countUpOrDown = true;
//         this.countingDistinct += 1;
//         this.indexCache.push(indexArray);
//         this.playerTopCard = card;
//       }
//     }
//   }
//   //if the length === 0 then  anything from the user could be played that matches the card in the pile
// } else {
//   if (
//     card.color === this.playerTopCard.color ||
//     card.cardValue === this.playerTopCard.cardValue
//   ) {
//     //if the card being added matches the previous card // which is the current player top card   by color or value move forward
//     if (this.indexCache.includes(indexArray) === false) {
//       this.gatherForPlay.push(card);
//       this.playerTopCard = card;
//       this.indexCache.push(indexArray);
//       this.playerTopCard = card;
//     }
//   } else if (
//     (this.isCountingPossible &&
//       (card.cardValue === this.playerTopCard.cardValue - 1 ||
//         card.cardValue === this.playerTopCard.cardValue + 1)) ||
//     ((this.playerTopCard === 0 && card.cardValue === 9) ||
//       (this.playerTopCard === 9 && card.cardValue === 0))
//   ) {
//     console.log("potential count");
//     if (
//       this.playerTopCard.cardValue !== WILD &&
//       this.playerTopCard.cardValue !== SKIP &&
//       this.playerTopCard.cardValue !== REVERSE &&
//       this.playerTopCard.cardValue !== DRAW2 &&
//       this.playerTopCard.cardValue !== DRAW4
//     ) {
//       // CAN'T COUNT UP OR DOWN USING WILDS REVERSES OR DRAWS  OR SKIPS
//       //count up and count down has been triggered
//       console.log("defintely a count play");
//       console.log(this.indexCache);
//       console.log(indexArray);
//       if (this.indexCache.includes(indexArray) === false) {
//         this.countUpOrDown = true;
//         this.countingDistinct += 1;
//         this.indexCache.push(indexArray);
//         this.gatherForPlay.push(card);
//         this.playerTopCard = card;
//       }
//     }
//   } else if (card.color === currentColor){
//     this.playerTopCard = card;
//     this.indexCache.push(indexArray);
//     this.gatherForPlay.push(card);
//   }
// }
