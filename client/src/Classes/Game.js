import generateDeck from "../Functions/generateDeck";
import playersLeft from "../Functions/playersleft";
import shuffleDeck from "../Functions/shuffleDeck";

class Game {
  constructor(playersPlaying, decksToGenerate = 1) {
    this.decksToGenerate = decksToGenerate;
    this.playersPlaying = playersPlaying;
    this.deck = [];
    this.playedPile = [];
    this.topCard = null;
    // ^this is the cards that have been played but not reinserted into the deck
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
    // return
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
    this.topCard = this.deck.pop();
    this.playedPile = [...this.topCard];
  }
}

export default Game;
