import React from "react";
import linkedListToArray from "../Functions/linkedListToArray";
/**
 *
 * Should be a array of Player class instances
 * Can access the name of the player and their cards left with .name and .cardsLeft
 */
const SideBar = ({ players, activePlayer }) => {
  /** players is a linked list  */
  players = linkedListToArray(players);
  console.log(players); 
  
  if (players.length &&  activePlayer){
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <th>Username</th>
                <th>CardsLeft</th>
              </tr>
              {players &&
                players.length &&
                players.map((player, index) => (
                  <tr key={index}><td className = {player.name === activePlayer.name ? "boldActivePlayer" : ""}>{player.name}</td><td>{player.cardsLeft}</td></tr>
                ))}
            </tbody>
          </table>
        </div>
      );
  }
  else {
      return <div></div>
  }
};

export default SideBar;
