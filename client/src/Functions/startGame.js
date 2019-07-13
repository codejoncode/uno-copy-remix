/**
 * this file is dedicated to starting the game 
 * will need a  array of player names can be type string 
 * loop through player names and  create player instances and then insert each player into game
 * deal
 * will also need a Game class instance created 
 */
import Game from "../Classes/Game";
import Player from "../Classes/Player";


const startNewGame = ( playersPlaying, numberOfplayersPlaying) => {
    /**
     * playersPlaying should be an array of players names to insert into the game 
     * now not sure but i will likely need more information to broadase each players moves on the screens for all to see. 
     * this will likely require exploring firebase to solve this problem or pusher js to solve this problem. 
     * I will also decide the number of decks to use in this function when generating the game 
     */
    //for every 4 players generate a new deck 
    const decksToGenerate = Math.ceil(numberOfplayersPlaying/4);
    //Create a new game instance 
    const game = new Game(numberOfplayersPlaying, decksToGenerate);
    // generate the deck for the new game 
    game.deckGenerationAndInitialShuffle();
    for(let player of playersPlaying){
        const newPlayer = new Player(player);
        game.insertPlayerIntoGame(newPlayer);
    }
    //now deal to all the players
    game.deal(); 

    return game; // should now be ready to play and the loop can be on another screen like the main app.js
} 

export default startNewGame;