const SKIP = 10;
const REVERSE = 11;
const DRAW2 = 12;
const WILD = 13;
const DRAW4 = 14;
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.cardsLeft = this.hand.length;
    this.gatherForPlay = [];
    this.playerTopCard = null;
    this.countUpOrDown = false;
    this.countingDistinct = 0;
    this.indexCache = [];
  }

  addToPlayersHand(card) {
    this.hand.push(card);
    this.cardsLeft += 1;
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

  gatherPlayersCards(indexArray, topCard, drawFlag = false) {
    /**
     * draw flag is false by default  so before gathering players cards it will be called to check if the drawTotal is > than zero
     * The first check is to see if the user  has a draw.
     */
    //does the user have a draw?
    if (
      drawFlag === true ||
      this.playerTopCard.cardValue === DRAW2 ||
      this.playerTopCard === DRAW4
    ) {
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
        const card = this.hand[indexArray];
        if (card.cardValue === DRAW2 || card.cardValue === DRAW4) {
          //user has the draw 2 or draw four and is prepared to fire it.
          this.gatherForPlay.push(card);
          this.playerTopCard = card;
          this.indexCache.push(indexArray);
          //return out   confirmation else where will confirm user wants to play or add cards.
        }
      }
    }

    //this will be an array of indexs to take from the players hand
    const card = this.hand[indexArray];
    //only check if the gatherForPlay is empty
    if (this.gatherForPlay.length === 0) {
      //a check is done on the topCard of the deck which should be the second paramater  moving forward the check will be done on the users topCard / last card  put on pile
      if (
        card.color === topCard.color ||
        card.cardValue === topCard.cardValue ||
        card.cardValue >= WILD
      ) {
        this.gatherForPlay.push(card);
        this.playerTopCard = card;
        this.indexCache.push(indexArray);
      } else if (
        card.cardValue === topCard.cardValue - 1 ||
        card.cardValue === topCard.cardValue + 1
      ) {
        if (
          this.playerTopCard.cardValue !== WILD &&
          this.playerTopCard.cardValue !== SKIP &&
          this.playerTopCard.cardValue !== REVERSE &&
          this.playerTopCard.cardValue !== DRAW2 &&
          this.playerTopCard.cardValue !== DRAW4
        ) {
          // CAN'T COUNT UP OR DOWN USING WILDS REVERSES OR DRAWS  OR SKIPS
          //countup or down has been triggered
          this.gatherForPlay.push(card);
          this.countUpOrDown = true;
          this.countingDistinct += 1;
          this.indexCache.push(indexArray);
        }
      }
      //if the length === 0 then  anything from the user could be played that matches the card in the pile
    } else {
      if (
        card.color === this.playerTopCard.color ||
        card.cardValue === this.playerTopCard.cardValue
      ) {
        //if the card being added matches the previous card // which is the current player top card   by color or value move forward
        this.gatherForPlay.push(card);
        this.playerTopCard = card;
        this.indexCache.push(indexArray);
      } else if (
        card.cardValue === this.playerTopCard.cardValue - 1 ||
        card.cardValue === this.playerTopCard.cardValue + 1 ||
        (this.playerTopCard === 0 && card.cardValue === 9)
      ) {
        if (
          this.playerTopCard.cardValue !== WILD &&
          this.playerTopCard.cardValue !== SKIP &&
          this.playerTopCard.cardValue !== REVERSE &&
          this.playerTopCard.cardValue !== DRAW2 &&
          this.playerTopCard.cardValue !== DRAW4
        ) {
          // CAN'T COUNT UP OR DOWN USING WILDS REVERSES OR DRAWS  OR SKIPS
          //count up and count down has been triggered
          this.countUpOrDown = true;
          this.countingDistinct += 1;
          this.indexCache.push(indexArray);
        }
      }
    }
    //MAYBE THIS SHOULD ACTUALLY BE IN THE PLAY TURN
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
  }

  resetBackToPrevious() {
    //if an error occurred reset the hand
    this.indexCache = [];
    this.gatherForPlay = [];
    this.playerTopCard = null;
    this.countUpOrDown = false;
    this.countingDistinct = 0;
  }

  playTurn() {
    //playArray should be an array even if its only one card.
    // should return false if no error is present or true if an error is present along with message so return an array
    if (this.gatherForPlay.length) {
      const gatheredCardsForPlay = [...this.gatherForPlay];
      //check if countUpOrDown  has been trigger if it has
      if (this.countUpOrDown) {
        //only if countingDistinct  is greater than or equal to 3
        if (this.countingDistinct >= 3) {
          //then it should be good play the cards   return false for no errors and the cards to play
          //reset first
          this.removeCardsPlayingFromHand();
          return [false, gatheredCardsForPlay];
        } else {
          this.resetBackToPrevious();
          //  return true error
          return [
            true,
            "Issue with play in order to count up or down you need to have 3 distinct numbers. Meaning you should have 3 individual numbers (not just cards) that counts up or counts down"
          ];
        }
      } else {
        //false return for no errors and cards to play.
        this.removeCardsPlayingFromHand();
        return [false, gatheredCardsForPlay];
      }
    } else {
      this.resetBackToPrevious(); // though shouldn't be needed if user didn't select a card everything should be at the begining stage.
      return [true, "Select a card to play"];
    }
    //topCard should be the top card shown on the board this should allow for making sure the player is making a valid move.

    //this will play the players cards
    //decrement the players hand
  }
}

export default Player;