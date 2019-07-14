import React, {Component} from 'react';
import './App.css';
import startGame from "./Functions/startGame";
import Card from "./Components/Card";
import SideBar from './Components/SideBar';
import MainBoard from './Components/MainBoard';

class App extends Component {
  state = {
    players :["Jonathan", "Timonthy", "James"],
    gameStarted: false,
    currentPlayer: null, 
    currentUsersHandAttempt : [],

  }

  removePlayersFromGame = () => {
    //players who no longer have cards should be removed. 
    let greaterThanZero = this.state.game.checkIfGameOver();
    if(greaterThanZero > 0){
      this.state.game.removePlayersThatHaveNoMoreCards();
    } 
  }

  newGame = async () => {
    console.log("starting new game")
    const {players} = this.state;
    const game = await startGame(players, players.length);
    //update the state with the game  
    await this.setState({game, gameStarted: true, currentPlayer: game.players[game.playerIndex]});
  }

  makePlay = () => async () => {
    console.log("make a  play");
    await this.state.game.mainGamePlay(this.state.game.players[this.state.game.playerIndex], "play");
    console.log(`This is the playerIndex for the game ${this.state.game.playerIndex}`);
    const currentPlayer = await this.state.game.players[this.state.game.playerIndex];
    const currentUsersHandAttempt = await currentPlayer.gatherForPlay; 
    this.setState({currentPlayer, currentUsersHandAttempt });
  }
  nextPlayer = () => async () => {
    //check that the users has made a pick up at least before they click nextPlayer
    //I don't want to remove the choice from the user they can choose to not play at all. 
    if(this.state.game.playMade){
      await this.removePlayersFromGame();
      await this.state.game.nextPlayersTurn(); 
      console.log(this.state.game.playerIndex);
      const currentPlayer = await this.state.game.players[this.state.game.playerIndex];   
      console.log(currentPlayer);
      const currentUsersHandAttempt = await currentPlayer.gatherForPlay; 
      this.setState({currentPlayer, currentUsersHandAttempt });
    }

  }

  pickUp = (playerInstance, playerChoosesTo) => () => {

    console.log(`${playerInstance.name} chooses to pickup.`);
    this.state.game.mainGamePlay(playerInstance, playerChoosesTo)
    this.setState({currentPlayer: this.state.game.players[this.state.game.playerIndex]})
  }
  selectingCard = (index) => async () => {
    console.log(`Selecting index ${index}`);
    const currentPlayer = await this.state.game.players[this.state.game.playerIndex]
    await this.state.game.mainGamePlay(currentPlayer, index);
    const currentUsersHandAttempt = await currentPlayer.gatherForPlay; 
    this.setState({currentPlayer, currentUsersHandAttempt})
  }

  clearCard = (index) => async () => {
    console.log("clearing card");
    //this function is for if the player makes a valid move but changes their mind and would like to play something differently. 
    const currentPlayer = await this.state.game.players[this.state.game.playerIndex];
    await currentPlayer.removeFromPlayersPlay(index);
    const currentUsersHandAttempt = await currentPlayer.gatherForPlay; 

    this.setState({currentPlayer, currentUsersHandAttempt});
  }
  dummyFunction = () => {
    //dummy function will just log to the console testing why the connection isn't there for another  function 
    console.log("dummy triggerd")
  }

  render(){
    const {gameStarted, currentUsersHandAttempt } = this.state; 
    const currentPlayer = this.state.game && this.state.game.players[this.state.game.playerIndex];
    
    console.log(currentPlayer);
    const topCard = this.state.game && this.state.game.topCard; 
    console.log(topCard);
    return (
      <div>
      {gameStarted && <SideBar players = {this.state.game.players} activePlayer = {currentPlayer}/>}
      { !gameStarted && <button onClick = {this.newGame}>Start Game</button>}
      {gameStarted &&  <MainBoard   topCard = {this.state.game.topCard}/> }
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {gameStarted && currentPlayer &&
        <div>
          {gameStarted && currentPlayer && 
        <div><button onClick = {this.makePlay()}>Play</button> <button >Select Card</button> <button onClick = {this.pickUp(currentPlayer, "pickup")}>Pick Up</button> <button onClick = {this.nextPlayer()}>next player</button></div> }
        {currentPlayer && currentPlayer.hand < 2 && <button>Call One</button>}
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
          {/* only the player logged in as this player should see the cards faces will modify this later down the line */}
          {currentPlayer && currentPlayer.hand.map((card, index) => <div className = "clickableCard" onClick = {this.selectingCard(index)} key = {index}><Card  card = {card} /></div>)}
        </div>
      }
       {gameStarted && !currentPlayer &&
         <button onClick = {this.newGame}>Start Game</button>
        }
        <br/>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {currentUsersHandAttempt  && currentUsersHandAttempt.map((card, index) => <div className = "clickableCard" key = {index} onClick = {this.clearCard(index)}><Card card={card} key = {index} /></div>)}
        
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