import playCardAssistor from "../Functions/playCardAssistor";
import {draws, colorChangers, counts}  from "../Functions/cardPlayHelper";
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
    // this.checkForCount();
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
  checkForDraw(){
    let userHasADraw = false;
    for (let card of this.hand) {
      if (card.cardValue === DRAW2 || card.cardValue === DRAW4) {
        userHasADraw = true;
      }
    }
    return userHasADraw;
      
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
    //only if the indexArray is not currently in the index Array 
    if (this.indexCache.includes(indexArray) === false){
      const card = this.hand[indexArray];
      if (playCardAssistor({topCard, cardToInsert: card, drawFlag, currentColor}) === true){
        console.log("Successfully went through play card assistor");
        //check if counts triggerd 
        if(String(topCard.cardValue) + String(card.cardValue)  in counts){
          console.log("setting count up or down  flag to true ");
          this.countUpOrDown = true; // this means we have to check for valid move played. 
        }
        console.log("placing card in position");
        this.placeCardInPosition(card, indexArray);
      } else {
        console.log("The move was not valid must see why and adjust");
        //check if top card was a  draw 
        if(String(topCard.cardValue) in draws){
          console.log("Checking to see if the player has a draw")
          const hasDraw = this.checkForDraw(); 
          if (hasDraw === false){
            //this line will force an automatic pick up of the cards for the user
            return [true, "User is forced to pick up", "pickup"];
          }
        } else {
          console.log("If its not due to a draw card needing to be played but wasn't not sure what it is. ")
        }
      }
    } else {
      console.log("this card is already selected in which the plan is to not display this in the hand section but later down the road");
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
    // this.checkForCount();
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
    this.gatherForPlay = [];
    this.indexCache = [];
  }
}

export default Player;

