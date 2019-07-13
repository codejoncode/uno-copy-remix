import React, {Component} from 'react';
import './App.css';
import startGame from "./Functions/startGame";


class App extends Component {
  state = {
    players :["Jonathan", "Timonthy", "James"]
  }

  newGame = () => {
    console.log("starting new game")
    const {players} = this.state;
    const game = startGame(players, players.length);
    //update the state with the game  
    this.setState({game});
  }

  useTurn = () => {

  }

  render(){

    return (
      <div>
       <button onClick = {this.newGame}>Start Game</button>

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