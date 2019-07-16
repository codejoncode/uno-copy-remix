/**
 * Currently I Have been having issues with the game skipping around when it's the next players turn
 * So this function will serve the purpose of handling this requirement and making this part of the game
 * bug free
 */

export const nextPlayersTurnHelper = (
  doublyCicularLinkedList,
  active,
  skips,
  direction
) => {
  /**
   * doublyCicularLinkedList   players
   *
   * skips is the number of skips thrown out
   * direction lets me know to go forward or backward
   * player to remove is optional but I am not handling this all in the same function as
   * when removing a player things tend to not work out  the idea is to set the next players turn then remove the player
   * currentPlayer.player.name tells me where we are currently should be a string the players name
   * the value in the linked list will be the players name   the data in the linked list will be  the players hand
   *
   */
  console.log("Inside the next players turn helper");

  console.log(`this is the player ${active.player.name}'s cards left :  ${active.player.cardsLeft} and also lets check their play has been done  ${active.player.gatherForPlay.length}`);
  //skips not considered if there are only 2 players it will remain the same persons turn.
  const greaterThanTwo = doublyCicularLinkedList.count > 2;
  let turnSwitched = false;
  
  // now the active should have the currently active player but no consideration has been made for if the players may need to be removed
  // from the game which is an possiblity
  // this done now because the player who just played a card is the likely one to not have any more cards.
  if (active.player.cardsLeft === 0) {
    console.log("active player is out of cards");
    // first take a look at the activePlayers hand  is it zero?
    if (direction === true) {
      console.log("forward direction normal iteration made");
      //mark player next to them as active then remove
      const playerToRemove = active.player.name;
      const playerToMarkActive = active.next.player.name;
      active = doublyCicularLinkedList.markActive(playerToMarkActive);
      doublyCicularLinkedList.remove(playerToRemove);
      let current = doublyCicularLinkedList.head; 
      let checked = 0; 
      console.log("iterating over the linked list to make sure the player with zero cards has been removed");
      console.log("this is likely a pointer issue where I am changing things on the linked list but it doesn't modify the actual linked list");
      while(checked < doublyCicularLinkedList.count){
        console.log(current.player);
        checked++;
        current = current.next; 
      }
      turnSwitched = true;
      console.log(
        `active player has no cards removing them ${playerToRemove} `
      );
      //else if false   go backwards
    } else if (direction === false) {
      console.log("backward direction normal iteration made");
      //mark player next to them as active then remove
      const playerToRemove = active.player.name;
      const playerToMarkActive = active.previous.player.name;
      active = doublyCicularLinkedList.markActive(playerToMarkActive);
      doublyCicularLinkedList.remove(playerToRemove);
      let current = doublyCicularLinkedList.head; 
      let checked = 0; 
      console.log("iterating over the linked list to make sure the player with zero cards has been removed");
      console.log("this is likely a pointer issue where I am changing things on the linked list but it doesn't modify the actual linked list");
      while(checked < doublyCicularLinkedList.count){
        console.log(current.player);
        checked++;
        current = current.next; 
      }
      turnSwitched = true;
      console.log(`active player has no cards removing them ${playerToRemove}`);
    }
  } else {
      console.log("the active players hand is not empty lets consider other factors");
  }
  // here here  what if  skips is zero and active.player.hand === 0 would have already iterated once
  if (skips === 0 && turnSwitched === false) {
    // now consider  if there is mroe than two players playing
    console.log("no skips are played iterating like normal");
    //naturally inside of this at least one iteration is needed depending on the direction
    active = normalIteration(direction, active);
    // slight issue with below what if we removed a player we are greater than 2 and skips is greater than zero one iteration has been made
  } else if (greaterThanTwo === true && skips > 0) {
    console.log("Greater than 2  and skips greater than zero");
    console.log(`${skips} skips to consider`);
    if (turnSwitched === false) {
      console.log("First iteration the normal ")
      active = normalIteration(direction, active); //solves the problem
    }
    console.log("console.log consider all skips now");
    console.log(`Reminder this is the skips ${skips}`);
    //now that is done we can account for any skips
    let skipsTaken = 0;
    while (skips > skipsTaken) {
      active = normalIteration(direction, active);
      skipsTaken++;
    }
  } else {
    console.log(
      "The else block is only being used to show that  there is something that has not been considered but perhaps the user had a empty hand and tht was all that was needed"
    );
  }

  return active;
};

export const normalIteration = (direction, active) => {
  // iterates active once time forward or backward  forward if direction is true else backward
  // should return active
  //if true go next
  if (direction === true) {
    active = active.next;
    console.log(`Changing turns to ${active.player.name}`);
    //else if false   go backwards
  } else if (direction === false) {
    active = active.previous;
    console.log(`Changing turns to ${active.player.name}`);
  } else {
    throw `Direction argument is not as expected needs to be true or false explicitly ${direction} received In nextPlayersTurnHelperFunction`;
  }
  return active;
};
