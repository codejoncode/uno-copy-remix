import React, {Component} from 'react';
import './App.css';
import startGame from "./Functions/startGame";
import Card from "./Components/Card";
import SideBar from './Components/SideBar';
import MainBoard from './Components/MainBoard';

class App extends Component {
  state = {
    players :["Jonathan", "Timonthy", "James", "Jacob", "Samantha", "Lady", "Computer", "Grand Master", "Chump"],
    gameStarted: false,
    currentPlayer: null, 
    currentUsersHandAttempt : [],

  }

  componentDidMount (){
    // will likely load the players for a game in  
    // can randomly mix the players up to switch things up each go round. 
    // for now nothing is being done. 
  }

  newGame = async () => {
    console.log("starting new game")
    const {players} = this.state;
    const game = await startGame(players, players.length);
    //update the state with the game  
    await this.setState({game, gameStarted: true, currentPlayer: game.currentPlayer});
  }

  makePlay = () => async () => {
    if(this.state.game.numberOfplayersPlaying > 1)
    {
      console.log("make a  play");
      await this.state.game.mainGamePlay(this.state.game.currentPlayer, "play");
      console.log(`This is the player playing${this.state.game.currentPlayer.player.name}`);
      const currentPlayer = this.state.game.currentPlayer;
      const currentUsersHandAttempt = currentPlayer.player.gatherForPlay; 
      this.setState({currentPlayer, currentUsersHandAttempt });

    }
  }
  nextPlayer = () => async () => {
    //check that the users has made a pick up at least before they click nextPlayer
    //I don't want to remove the choice from the user they can choose to not play at all. 
    if(this.state.game.playMade){
      await this.state.game.nextPlayersTurn(); 
      const currentPlayer = this.state.game.currentPlayer;   
      console.log(currentPlayer.player.name);
      const currentUsersHandAttempt =  currentPlayer.player.gatherForPlay; 
      this.setState({currentPlayer, currentUsersHandAttempt });
    }

  }

  pickUp = (playerInstance, playerChoosesTo) => () => {

    console.log(`${playerInstance.player.name} chooses to pickup.`);
    this.state.game.mainGamePlay(playerInstance, playerChoosesTo)
    this.setState({currentPlayer: this.state.game.currentPlayer})
  }

  selectingCard = (index) => async () => {
    console.log(`Selecting index ${index}`);
    await this.state.game.mainGamePlay(currentPlayer, index);
    const currentPlayer = this.state.game.currentPlayer
    const currentUsersHandAttempt = currentPlayer.player.gatherForPlay; 
    this.setState({currentPlayer, currentUsersHandAttempt})
  }

  clearCard = (index) => async () => {
    console.log("clearing card");
    //this function is for if the player makes a valid move but changes their mind and would like to play something differently. 
    const currentPlayer = this.state.game.currentPlayer;
    await currentPlayer.player.removeFromPlayersPlay(index);
    const currentUsersHandAttempt = currentPlayer.player.gatherForPlay; 

    this.setState({currentPlayer, currentUsersHandAttempt});
  }
  dummyFunction = () => {
    //dummy function will just log to the console testing why the connection isn't there for another  function 
    console.log("dummy triggerd")
  }

  render(){
    const {gameStarted, currentUsersHandAttempt } = this.state; 
    const currentPlayer = this.state.game && this.state.game.currentPlayer;
    
    console.log(currentPlayer);
    const topCard = this.state.game && this.state.game.topCard; 
    console.log(topCard);
    return (
      <div>
      {gameStarted && <SideBar players = {this.state.game.players} activePlayer = {currentPlayer.player.name}/>}
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
        <div><button onClick = {this.makePlay()}>Play</button> <button onClick = {this.pickUp(currentPlayer, "pickup")}>Pick Up</button> <button onClick = {this.nextPlayer()}>next player</button></div> }
        {currentPlayer && currentPlayer.player.hand < 2 && <button>Call One</button>}
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
