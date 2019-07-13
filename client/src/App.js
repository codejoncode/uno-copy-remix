import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render(){

    return (
      <div>
       
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