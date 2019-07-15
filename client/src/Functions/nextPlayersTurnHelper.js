/**
 * Currently I Have been having issues with the game skipping around when it's the next players turn
 * So this function will serve the purpose of handling this requirement and making this part of the game
 * bug free
 */
import LinkedList from "../Classes/LinkedList"; //actually is a doubly circular linked list

const nextPlayersTurnHelper = (
  playersArray,
  currentPlayer,
  skips,
  direction
) => {
  /**
   * playersArray is a list of players
   *
   * skips is the number of skips thrown out
   * direction lets me know to go forward or backward
   * player to remove is optional but I am not handling this all in the same function as
   * when removing a player things tend to not work out  the idea is to set the next players turn then remove the player
   * currentPlayer tells me where we are currently should be a string the players name
   * the value in the linked list will be the players name   the data in the linked list will be  the players hand
   *
   */
  //skips not considered if there are only 2 players it will remain the same persons turn.
  const greaterThanTwo = playersArray.length > 2;

  const doublyCicularLinkedList = new LinkedList();
  //add to linked list
  for (let index = 0; index < playersArray.length; index++) {
    const player = playersArray[index];
    doublyCicularLinkedList.append(player);
  }
  //To keep this O(n) operations I am setting the active player outside of the first for loop
  let active = doublyCicularLinkedList.markActive(currentPlayer); // basically another loop
  let turnSwitched = false;

  // now the active should have the currently active player but no consideration has been made for if the players may need to be removed
  // from the game which is an possiblity
  // this done now because the player who just played a card is the likely one to not have any more cards.
  if (active.player.hand === 0) {
    // first take a look at the activePlayers hand  is it zero?
    if (direction === true) {
      //mark player next to them as active then remove
      const playerToRemove = active.player.name;
      const playerToMarkActive = active.next.player.name;
      doublyCicularLinkedList.markActive(playerToMarkActive);
      doublyCicularLinkedList.remove(playerToRemove);
      turnSwitched = true;
      console.log(
        `active player has no cards removing them ${playerToRemove} `
      );
      //else if false   go backwards
    } else if (direction === false) {
      //mark player next to them as active then remove
      const playerToRemove = active.player.name;
      const playerToMarkActive = active.previous.player.name;
      doublyCicularLinkedList.markActive(playerToMarkActive);
      doublyCicularLinkedList.remove(playerToRemove);
      turnSwitched = true;
      console.log(
        `active player has no cards removing them ${playerToRemove} `
      );
    }
  }
  // here here  what if  skips is zero and active.player.hand === 0 would have already iterated once
  if (skips === 0 && turnSwitched === false) {
    // now consider  if there is mroe than two players playing
    console.log("no skips are played iterating like normal");
    //naturally inside of this at least one iteration is needed depending on the direction

    active = normalIteration(direction, active);
    // slight issue with below what if we removed a player we are greater than 2 and skips is greater than zero one iteration has been made
  } else if (greaterThanTwo === true && skips > 0) {
    if (turnSwitched === false) {
      active = normalIteration(direction, active); //solves the problem
    }
    //now that is done we can account for any skips
    let skipsTaken = 0;
    while (skips > skipsTaken) {
      normalIteration(direction, active);
      skipsTaken++;
    }
  }
};

const normalIteration = (direction, active) => {
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
    throw error(
      `Direction argument is not as expected needs to be true or false explicitly ${direction} received In nextPlayersTurnHelperFunction`
    );
  }
  return active;
};
