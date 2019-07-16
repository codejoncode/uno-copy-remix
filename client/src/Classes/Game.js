import generateDeck from "../Functions/generateDeck";
import playersLeft from "../Functions/playersleft";
import shuffleDeck from "../Functions/shuffleDeck";
import finalCountCheck from "../Functions/finalCountCheck";
import linkedList from "./LinkedList";
import { nextPlayersTurnHelper } from "../Functions/nextPlayersTurnHelper";
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
    this.players = new linkedList();
    this.drawTotal = 0;
    this.direction = true; // "forward  === true  backward === false"
    this.currentPlayer = null;
    this.playerIndex = 0;
    this.increment = 0;
    this.playersRanksArray = [];
    this.colorIs = null;
    this.skips = 0;
    this.reverseOrSkip = false;
    this.error = null; // using this to help display errors to the user when they occur instead of returns
    this.defaultAction = null; // this is when a user has to take a default action no other choice availalbe.
    this.userStillHasChoice = true; // defaulted to true but can change like when a user has picked up a draw stack.
    //if a user picks up one card by choice they can still play that card or more.
    // ^this is the cards that have been played but not reinserted into the deck
    this.pickUpAllowed = true;
    this.playMade = false;
    this.displayHand = [];
  }
  resetGameFieldsToDefault() {
    this.error = null;
    this.reverseOrSkip = false;
    this.userStillHasChoice = true;
    this.defaultAction = null;
    this.skips = 0;
    // this.drawTotal = 0; this shouldn't be in here because the drawTotal carries on to the next player. only reset once picked up
    this.increment = 0;
    this.pickUpAllowed = true;
    this.playMade = false;
  }

  mainGamePlay(player, playerChoosesTo, againstPlayer = null) {
    /**
     * player is a node from linkedlist and its value is player which has  the instance class Player information  so   player.next goes to next  noe but player.player  provides player methods from the Player class
     *
     * playerChoosesTo is a string that is used in the switch statement of this function   againstPlayer is defaulted to null and not needed for any scenario at this time will come later when in fact a player wishes to penalize another player.
     *
     *
     */

    //check if gameOver    if it is return out nothing more to do
    if (this.checkIfGameOver() === false) {
      this.error = "Game Over"; // this should be dispalyed to all users
      console.log("Game is over");
      return;
    }

    //now run the players choice through the switch
    switch (playerChoosesTo) {
      case "play":
        console.log(`${player.player.name} chooses to play their hand`);

        const checkForErrors = player.player.playTurn();
        if (checkForErrors[0] === true) {
          console.log(`There is an error in ${player.player.name}'s hand`);
          //check if lenfth is === to 3
          //if so the player has no choice but to pick up
          if (checkForErrors.length === 3) {
            //recursively call this function again to force the pickup
            this.mainGamePlay(player, checkForErrors[2]);
          } else {
            //display error to the player
            console.log(checkForErrors[1]);
          }
        } else {
          //show everyone what was played
          this.displayHand = checkForErrors[1];
          const playersCardsToPlay = this.displayHand;
          console.log(`${player.player.name} has no errors`);
          console.log(this.displayHand);

          console.log("No errors  attempting to play the users hand");
          //check if a countUpOrDown has occurred
          if (player.player.countUpOrDown === true) {
            //penalize 2 cards
            this.drawFlag(2);
            //make user lose turn and be forced to pick up;
            console.log("You lose your turn and have to pick up 2 cards");
            this.mainGamePlay(player, "pickup");
            return; // stop here
          }
          console.log("Going through the players cards");
          for (let index = 0; index < playersCardsToPlay.length; index++) {
            const card = playersCardsToPlay[index];
            console.log(card);
            //check if reverse change direction if true
            if (card.cardValue === SKIP) {
              // this.reverseOrSkip = true; not sure if i want this
              this.addToSkips();
            } else if (card.cardValue === REVERSE) {
              console.log("REVERSE CARD");
              this.changeDirection();
            } else if (card.cardValue === DRAW2) {
              console.log("DRAW2 PLAYED");
              this.drawFlag(card.drawValue);
              console.log(`This is the current drawTotal ${this.drawTotal}`);
            } else if (card.cardValue === WILD) {
              console.log("WILD PLAYED");
            } else if (card.cardValue === DRAW4) {
              console.log("DRAW4 PLAYED");
              this.drawFlag(card.drawValue);
              console.log(`This is the current drawTotal ${this.drawTotal}`);
            }

            //add to the playedPile
            this.playedPile.push(card);

            //deal with the last card
            if (index === playersCardsToPlay.length - 1) {
              if (card.cardValue === WILD || card.cardValue === DRAW4) {
                //MAY CONSIDER  ADDING PLAYER TO THIS SO IT CAN DISPLAY TO THE PLAYER
                // OR JUST USE CURRENT ACTIVE PLAYER
                this.pickColorToChangeTo();
              }
              this.topCard = card;
              const currentColor =
                this.colorIs === this.topCard.color
                  ? this.colorIs
                  : this.topCard.color;
              this.colorIs =
                currentColor !== "black" ? currentColor : this.colorIs;
              console.log(`The current color is ${this.colorIs}`);
              // check if its a reverse
              if (
                this.topCard.cardValue === REVERSE ||
                this.topCard.cardValue === SKIP
              ) {
                if (this.players.count > 2) {
                  console.log(
                    "Reverse or skip card but more than 2 players in the game"
                  );
                  this.currentPlayer = nextPlayersTurnHelper(
                    this.players,
                    player,
                    this.skips,
                    this.direction
                  );
                  this.resetGameFieldsToDefault();
                }
              } else {
                this.currentPlayer = nextPlayersTurnHelper(
                  this.players,
                  player,
                  this.skips,
                  this.direction
                );
                this.resetGameFieldsToDefault();
              }
            }
          }
        }
        // reset  things  that need to be reset
        //this.nextPlayersTurn may have what I need to get the reset done.
        break;
      case "pickup":
        console.log("The player will be picking up ");
        console.log(`This is the drawTotal ${this.drawTotal}`);
        //handle draw Total pick up or a pick up of one card
        const pickUpAmount = this.drawTotal > 0 ? this.drawTotal : 1;
        if (this.drawTotal > 0) {
          console.log(`${this.drawTotal} cards to be picked up`);
          this.drawTotal = 0;
          this.issueFromDeck(player, pickUpAmount);
          this.currentPlayer = nextPlayersTurnHelper(
            this.players,
            player,
            this.skips,
            this.direction
          );
          this.resetGameFieldsToDefault();
          //handle reset if neccessary  like whats in this.nextPlayersTurn();
        } else if (this.pickUpAllowed) {
          console.log("Pick up is allowed player picking up one");
          this.issueFromDeck(player, pickUpAmount);
          this.pickUpAllowed = false;
          this.playMade = true; // will allow a user to click for next player to go.
        } else {
          console.log(
            "This user has already picked up and cannot pick up again"
          );
          this.currentPlayer = nextPlayersTurnHelper(
            this.players,
            player,
            this.skips,
            this.direction
          );
          this.resetGameFieldsToDefault();
          //handle reset if neccessary  like whats in this.nextPlayersTurn();
        }
        break;
      case "call uno":
        console.log(`${player.name} calls uno`);
        break; // likely will broadcast this to the rest of the group;
      case "penalize":
        if (againstPlayer === null) {
          throw error(
            "againstPlayer should be an instance of the Player class and not null. This error occurs in the penalize case of the switch function of the mainGamePlay method of the Game class"
          );
        }
        //penalize can happen when a player doesn't call uno but has one card left
        console.log(
          `${player.player.name} penalizes ${
            againstPlayer.player.name
          } for not calling uno issuing two cards to ${
            againstPlayer.player.name
          }`
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
        this.coloris = "green";
        break;
      default:
        //so this is a number we hope and should check for
        //the index of the players hand
        if (typeof playerChoosesTo === "number") {
          const drawFlag = this.drawTotal > 0 ? true : false;
          if (player.player.gatherForPlay.length === 0) {
            player.player.gatherPlayersCards(
              playerChoosesTo,
              this.topCard,
              drawFlag,
              this.colorIs
            );
          } else {
            player.player.gatherPlayersCards(
              playerChoosesTo,
              player.player.playerTopCard,
              drawFlag,
              this.colorIs
            );
          }
        } else {
          throw error(`${playerChoosesTo} is not a valid option currently`);
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
    if (this.checkIfGameOver() === false) {
      console.log("things breaking");
      this.error = "Game Over";
      return;
    }
    console.log(
      `${player.player.name} getting ${amount} ${amount > 1 ? "cards" : "card"}`
    );
    //story user has to pick up or chooses to pick up still can drop down though. // amount should be either 1 by default or the drawTotal
    //player should be an instance of Player class
    if (this.pickUpAllowed) {
      while (amount > 0) {
        player.player.addToPlayersHand(this.deck.pop());
        amount--;
      }

      console.log(player.player.name);
      //reset this.drawTotal incase IssueFromDeck was called for a non optional pick up
      if (this.drawTotal > 0) {
        //this indicates that the playeer was picking up a draw Total therefore there turn is over.
        this.userStillHasChoice = false;
        this.drawTotal = 0;
        // this.nextPlayersTurn();
        this.currentPlayer = nextPlayersTurnHelper(
          this.players,
          player,
          this.skips,
          this.direction
        );
        this.resetGameFieldsToDefault();
        //handle reset if neccessary  like whats in this.nextPlayersTurn();
      }

      // this.drawTotal = 0;// should reset it
      if (this.deck.length <= 25) {
        this.shuffleCardPileBackIntoDeck();
      }
      this.pickUpAllowed = false;
      
    } else {
      console.log("Pick up is not allowed");
      this.currentPlayer = nextPlayersTurnHelper(
        this.players,
        player,
        this.skips,
        this.direction
      );
      this.resetGameFieldsToDefault();
      //handle reset if neccessary  like whats in this.nextPlayersTurn();
    }
  }

  addToSkips() {
    if (playersLeft(this.players) > 2) {
      console.log("Added to skips");
      this.skips += 1;
    }
  }

  skippingAPlayer() {
    if (playersLeft(this.players) == 2 && this.reverseOrSkip) {
      console.log("only two players left and a skip or reverse played");
      this.increment = 0;
    } else {
      this.increment = this.skips + 1;
      console.log(`skips ${this.skips} + 1 `);
    }
  }

  nextPlayersTurn() {
    if (this.checkIfGameOver() === false) {
      console.log("Game over");
      this.error = "Game Over";
      return;
    }
    this.currentPlayer = nextPlayersTurnHelper(
      this.players,
      player,
      this.skips,
      this.direction
    );
    this.resetGameFieldsToDefault();
    //handle reset if neccessary  like whats in this.nextPlayersTurn();
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
  }

  checkIfGameOver() {
    return playersLeft(this.players) > 1;
  }

  insertPlayerIntoGame(playerInstance) {
    /**
     * Should be a playerInstance from Player class
     * insert into doubly circular linked list
     */
    
    this.players.append(playerInstance);
    if (this.players.count === 1){
      console.log(`Setting the player to start the game to ${this.players.head.player.name}`);
      this.currentPlayer = this.players.head; 
    }
  }

  deal() {
    let totalCards = 7;
    while (totalCards > 0) {
      let dealtTo = 0;
      let current = this.players.head;
      while (dealTo < this.players.count) {
        current.player.addToPlayersHand(this.deck.pop()); // player presents the playerInstance the value of the node.
        current = current.next; // iterate to next
        dealtTo++; // keep count the linked list is circular could loop on forever
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
    console.log(
      `This is the current draw amount ${this.drawTotal} + ${drawAmount}`
    );
    this.drawTotal += drawAmount;
    if (this.deck.length <= this.drawTotal + 10) {
      this.shuffleCardPileBackIntoDeck();
    }
  }
}
//end of game class

export default Game;
