import React, {Component} from 'react';
import './App.css';
import startGame from "./Functions/startGame";
import Card from "./Components/Card";
import SideBar from './Components/SideBar';

class App extends Component {
  state = {
    players :["Jonathan", "Timonthy", "James"],
    gameStarted: false,
    currentPlayer: null, 
  }

  newGame = async () => {
    console.log("starting new game")
    const {players} = this.state;
    const game = await startGame(players, players.length);
    //update the state with the game  
    await this.setState({game, gameStarted: true, currentPlayer: game.players[game.playerIndex]});
  }

  useTurn = () => {

  }

  render(){
    const {gameStarted, currentPlayer} = this.state; 
    
    console.log(currentPlayer);
    return (
      <div>
        {gameStarted && <SideBar players = {this.state.game.players} activePlayer = {currentPlayer}/>}
      { !gameStarted && <button onClick = {this.newGame}>Start Game</button>}
      {gameStarted && currentPlayer &&
        <div>
          {/* only the player logged in as this player should see the cards faces will modify this later down the line */}
          {currentPlayer && currentPlayer.hand.map((card, index) => <Card key = {index} card = {card}/>)}
        </div>
      }
       {gameStarted && !currentPlayer &&
         <button onClick = {this.newGame}>Start Game</button>
        }
        <br/>
        {gameStarted && currentPlayer && 
        <div><button>Play</button> <button>Select Card</button> <button>Pick Up</button></div> }
        {currentPlayer && currentPlayer.hand < 2 && <button>Call One</button>}
      </div>
    );
  }
}

export default App;

// while(game.checkIfGameOver()=== true)
// {
//   //show top card 
//   console.log(`current top card  ${game.topCard}`);
//   //currentPlayer 
//   const currentPlayer = game.players[game.playerIndex];
//   //show whose turn it is 
//   console.log(`Its your turn ${currentPlayer.name}`);
//   //show current players hand  
//   console.log(`Here is whats in your hand ${currentPlayer.hand}`);
//   if(currentPlayer.gatherForPlay.length > 0){
//     console.log(`Already selected ${currentPlayer.gatherForPlay}`);
//   }

//   const userChoice = window.prompt("Please enter your choice index of card from your hand\n  play -->>to play what you selected \n pickup --> to pick up a card or cards if there is a draw penalty");
//   if(userChoice)
//   {
//     mainGamePlay(currentPlayer, userChoice);
//   }