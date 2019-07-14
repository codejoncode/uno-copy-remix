import generateDeck from "../Functions/generateDeck";
import playersLeft from "../Functions/playersleft";
import shuffleDeck from "../Functions/shuffleDeck";
const SKIP = 10;
const REVERSE = 11;
const DRAW2 = 12;
const WILD = 13;
const DRAW4 = 14;
class Game {
  constructor(numberOfplayersPlaying, decksToGenerate = 1) {
    /**
     * numberofPlayersPlaying should be an int same with decksTogenerate
     */
    this.decksToGenerate = decksToGenerate;
    this.numberOfplayersPlaying = numberOfplayersPlaying;
    this.deck = [];
    this.playedPile = [];
    this.topCard = null;
    this.players = [];
    this.drawTotal = 0;
    this.direction = true; // "forward  === true  backward === false"
    this.playerIndex = 0;
    this.increment = 0;
    this.playersRanksArray = [];
    this.colorIs = null;
    this.skips = 0;
    this.error = null; // using this to help display errors to the user when they occur instead of returns 
    this.defaultAction = null; // this is when a user has to take a default action no other choice availalbe. 
    this.userStillHasChoice = true; // defaulted to true but can change like when a user has picked up a draw stack. 
    //if a user picks up one card by choice they can still play that card or more. 
    // ^this is the cards that have been played but not reinserted into the deck
    this.pickUpAllowed = true; 
  }
  mainGamePlay(player, playerChoosesTo, againstPlayer = null) {
    // player should be instance of Player Calss playerChoosesTo is their decesion they make   playersCardsToPlay is optional because not all choices requires them to play cards.
    /**
     * againstPlayer is for when a player doesn't call uno  and anotehr player chooses to call this against them this will issue the againstPlayer 2 cards should be an instance of the playerClass   this button would only appear in cases where the person is down to one card. and has not called uno.
     */
    switch (playerChoosesTo) {
      case "play":
        const checkForErrors = player.playTurn();
        if (checkForErrors[0] === true) {
          // there is an error
          // if checkForErrors has a length of three a default option is chosen for the player example they have to pick up the cards
          if (checkForErrors.length === 3) {
            this.mainGamePlay(player, checkForErrors[2]);
            //recursively call this function on itself  but now insert the users defaulted choice.  pick up the draw amount.
          } else {
            //displayer error to the player
            console.log(checkForErrors[1]);
            //maybe a Player.error is based to show only the player or show everyone the error  maybe even pentalize for  making a mistake?
          }
        } else {
          const playersCardsToPlay = checkForErrors[1];
          for (let index = 0; index < playersCardsToPlay.length; index++) {
            const card = playersCardsToPlay[index];
            //check if reverse change direction if true
            if (card.cardValue === SKIP) {
              this.addToSkips();
            } else if (card.cardValue === REVERSE) {
              //this is the reverse card
              this.changeDirection();
            } else if (card.cardValue === DRAW2) {
              //provide the drawValue to the drawFlag;
              this.drawFlag(card.drawValue);
            } else if (card.cardValue === WILD) {
              // wild card
              this.pickColorToChangeTo();
            } else if (card.cardValue === DRAW4) {
              this.drawFlag(card.drawValue);
              this.pickColorToChangeTo();
            }

            this.playedPile.push(card);

            if (index === playersCardsToPlay.length - 1) {
              this.topCard = card;
              const currentColor =
                this.colorIs === this.topCard.color ? this.colorIs : this.topCard.color;
              this.colorIs = currentColor !== "black" ?  currentColor: this.colorIs;
              console.log(`The current color is ${this.colorIs}`);
              this.nextPlayersTurn();
            }
          }
          // clear players hand
        }

        break;
      case "pickup":
        console.log("In game player chooses to pick up")
        const pickUpAmount = this.drawTotal > 0 ? this.drawTotal : 1;
        this.issueFromDeck(player, pickUpAmount);
        if(this.drawTotal > 0){
          this.nextPlayersTurn();// shouldn't automatically be the next players turn. 
          //unless user is picking up a draw total. 
          this.drawTotal = 0; 
        } else {
          
        }
        break;
      case "call uno":
        console.log(`${player.name} calls uno`);
        break; // likely will broadcast this to the rest of the group
      case "penalize":
        //now penalize can only happen if clicked before the player calls uno when they only have one card.   so have to work out this timing for now I am placing a a case here
        console.log(
          `${player.name} penalizes  ${
            againstPlayer.name
          } for not calling uno issuing  two cards to ${againstPlayer.name}`
        );
        this.issueFromDeck(againstPlayer, 2);
        break;
      case "blue":
        this.colorIs = "blue";
        break;
      case "red":
        this.colorIs = "red";
        break;
      case "yellow":
        this.colorIs = "yellow";
        break;
      case "green":
        this.colorIs = "green";
        break;
      default:
        // so this is a number we hope and should check for
        if (typeof playerChoosesTo === "number") {
          const drawFlag = this.drawTotal > 0 ? true : false;
          if(player.gatherForPlay.length === 0){
            player.gatherPlayersCards(playerChoosesTo, this.topCard, drawFlag, this.colorIs);
          } else {
            player.gatherPlayersCards(playerChoosesTo, player.playerTopCard, drawFlag, this.colorIs);
          }
        } else {
          console.log(`${playerChoosesTo} is not a valid option currently`);
        }
        break;
    }
  }

  pickColorToChangeTo() {
    const colors = ["red", "yellow", "blue", "green"];
    while (true) {
      const color = window.prompt(
        "Pick the new color blue yellow green or red"
      );
      if (colors.includes(color)) {
        this.colorIs = color;
        console.log(`The color is now  ${color}`);
        break;
      }
    }
  }

  issueFromDeck(player, amount = 1) {
    console.log(`${player.name} getting ${amount} ${amount > 1 ? "cards" : "card"}`)
    //story user has to pick up or chooses to pick up still can drop down though. // amount should be either 1 by default or the drawTotal
    //player should be an instance of Player class
    if(this.pickUpAllowed){
      while (amount > 0) {
        player.addToPlayersHand(this.deck.pop());
        amount--;
      }

      console.log(player);
      //reset this.drawTotal incase IssueFromDeck was called for a non optional pick up
      if(this.drawTotal > 0){
        //this indicates that the playeer was picking up a draw Total therefore there turn is over. 
        this.userStillHasChoice = false; 
        this.nextPlayersTurn(); 
      }

      this.drawTotal = 0;// should reset it 
      if (this.deck.length <= 10) {
        this.shuffleCardPileBackIntoDeck();
      }
      this.pickUpAllowed = false; 

    } else {

      this.nextPlayersTurn();
    }
  }

  addToSkips() {
    this.skips += 1;
  }

  skippingAPlayer() {
    if (playersLeft(this.players) > 2) {
      this.increment += this.skips + 1;
    } else {
      this.increment = 0;
    }
  }

  nextPlayersTurn() {
    this.skippingAPlayer();
    console.log(this.playerIndex); 
    if (this.direction) {
      console.log(`This is the increment ${this.increment} this is the number of players playing ${this.numberOfplayersPlaying} `)
      this.playerIndex =
        (this.playerIndex + this.increment) %   this.numberOfplayersPlaying;
      console.log(this.playerIndex); 
      this.increment = 0;
      this.skips = 0;
      this.userStillHasChoice = true;
      this.pickUpAllowed = true;  
    } else {
      //this.playerIndex =
        //((this.playerIndex - this.increment) %   this.numberOfplayersPlaying) < 0 ? this.numberOfplayersPlaying - ((this.playerIndex - this.increment) %   this.numberOfplayersPlaying) : this.playerIndex % this.numberOfplayersPlaying;
      while(this.increment > 0){
        console.log(`decrementing the player index currently at ${this.playerIndex}`)
        this.playerIndex -= 1; 
        if(this.playerIndex < 0){
          this.playerIndex = this.numberOfplayersPlaying - 1; 
        }
        this.increment -= 1; 
      }
      this.increment = 0;
      this.skips = 0;
      this.userStillHasChoice = true;
      this.pickUpAllowed = true; 
    }
    console.log(this.playersIndex);
  }

  changeDirection() {
    this.direction = !this.direction;
  }

  deckGenerationAndInitialShuffle() {
    this.deck = shuffleDeck(generateDeck(this.decksToGenerate));
  }

  shuffleCardPileBackIntoDeck() {
    const pileWithoutTopCard = this.playedPile.slice(
      0,
      this.playedPile.length - 1
    );
    const deckToShuffle = [...this.deck, ...pileWithoutTopCard];
    this.topCard = this.playedPile[this.playedPile.length - 1];
    this.deck = shuffleDeck(deckToShuffle);
    this.playedPile = [...this.topCard];
    this.players = [];
  }

  checkIfGameOver() {
    return playersLeft(this.players) > 1;
  }

  removePlayersThatHaveNoMoreCards () {
    const newPlayers = []; 
    const players = this.players; 
    for(let player of players){
      console.log("player")
      console.log(player)
      if(player.hand.length > 0){
        newPlayers.push(player);
      } else {
        this.playersRanksArray.push(player);
      }
    }
    this.players = newPlayers; 
    this.numberOfplayersPlaying = this.players.length; 
    console.log(`player index ${this.playerIndex} numberOfplayersPlaying = ${this.numberOfplayersPlaying}`); 
  }

  insertPlayerIntoGame(playerInstance) {
    /**
     * Should be a playerInstance from Player class
     * insert into array
     */
    this.players.push(playerInstance);
  }

  deal() {
    let totalCards = 7;
    while (totalCards > 0) {
      for (let player of this.players) {
        player.addToPlayersHand(this.deck.pop());
      }
      totalCards--;
    }
    while (true) {
      const popOff = this.deck.pop();
      this.topCard = popOff;
      this.colorIs = this.topCard.color; 
      console.log(`The color is ${this.colorIs}`);
      if (popOff.cardValue === WILD) {
        //choose random color announce it and keep it going
        this.randomColorSelection();
        break;
      } else if (popOff.cardValue === REVERSE) {
        //change directions
        this.changeDirection();
        //different players turn
        this.nextPlayersTurn();
        break;
      } else if (popOff.cardValue === SKIP) {
        //in the begining of the game we don't add to skips just want to go to the next person 
        //if three people are playing and add to skips is called ti will go to the third person when it should go to the second
        this.nextPlayersTurn();
        break;
      } else if (popOff.cardValue === DRAW2) {
        //raise draw amount
        this.drawFlag(popOff.drawValue);
      } else if (popOff.cardValue === DRAW4) {
        //raise draw amount
        this.drawFlag(popOff.drawValue);
        //choose random color;
        this.randomColorSelection();
        break;
      } else {
        break;
      }
    }

    this.playedPile = [this.topCard];
  }

  randomColorSelection() {
    /**
     * this function is called if a card is selected that requires a color to be chosen when the cards are first dealed.
     */
    const colors = ["red", "blue", "yellow", "green"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    this.colorIs = color;
    console.log(`The color is ${color}`);
  }

  drawFlag(drawAmount) {
    //this will throw a flag that will either check for a draw for the next player or  prepare to issue that person cards
    console.log(`This is the current draw amount ${this.drawTotal} + ${drawAmount}`); 
    this.drawTotal += drawAmount;
    if (this.deck.length <= this.drawTotal + 10) {
      this.shuffleCardPileBackIntoDeck();
    }
  }
}
//end of game class

export default Game;
