import generateDeck from "../Functions/generateDeck";
import playersLeft from "../Functions/playersleft";
import shuffleDeck from "../Functions/shuffleDeck";

class Game {
    constructor(playersPlaying, decksToGenerate = 1){
       this.decksToGenerate = decksToGenerate;
       this.playersPlaying = playersPlaying;  
       this.deck = []; 
       this.playedPile = []; 
       this.topCard = null; 
       // ^this is the cards that have been played but not reinserted into the deck
    }

    deckGenerationAndInitialShuffle () {
        this.deck = shuffleDeck(generateDeck(this.decksToGenerate));
    }

    shuffleCardPileBackIntoDeck () {
        const pileWithoutTopCard =  this.playedPile.slice(0, this.playedPile.length-1);
        const deckToShuffle = [...this.deck, ...pileWithoutTopCard];
        this.topCard = this.playedPile[this.playedPile.length - 1];
        this.deck = shuffleDeck(deckToShuffle); 
        this.playedPile = [...this.topCard];
    }

    checkIfGameOver () {
        // return 
    }

    insertPlayerIntoGame (playerInstance) {
        /**
         * Should be a playerInstance from Player class
         * insert into array 
         */
        this.players.push(playerInstance); 
      }

    dealToPlayers () {
        /**
         * Seven cards each to every player 
         */
        //loop over 7 times  to each player giving them one card each iteration
        //for time complexity reasons it would be faster to deal from the pack since pop works in constant time
        
    }
}


export default Game; 