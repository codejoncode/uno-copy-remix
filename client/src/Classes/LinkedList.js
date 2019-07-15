/**
 * This file has been tested and i considered using a linked list to test connections
 * I am considering using a linked List for the players in the game so I can loop around better without the worry of 
 * proper math being done for the index.   I have some skipping bugs where a player shouldn't be skippe happening right now
 * still undecided but the data structure is fully operational and tested  next works  and previous I would need to  add a removal
 * method for when a player is no longer in the game though 
 */

class LinkedList{
  constructor(){
      this.head = null;
      this.tail = null; 
      this.count = 0; 
  }

  append (player) {
    const newNode = {};
    newNode.player = player; 
    if(this.count === 0){
      this.head = newNode;
      this.head.next = newNode;
      this.tail = this.head;
      this.head.previous = this.tail;
      this.tail.previous = this.head; 
    } else {
      newNode.previous = this.tail; 
      this.tail.next = newNode;
      this.tail = newNode;
      this.tail.next = this.head; // round and round
      //this connects the head to the tail makes it go round and round as well. 
      this.head.previous = this.tail; 
    }
    this.count++;
  }
  remove(name){
    /**
     * search for value then remove it 
     * value will be a players instance so the value we are looking for is the name 
     */
    let current = this.head; 
    //it's a circular linked list so this will loop forever if the value doesn't exist 
    let checked = 0; //increment each time we go next 
    while(current.player.name != name || checked < this.count){
      current = current.next; 
      checked++; 
    }
    //at this point because I avoided the infinite loop I still have to check if player of current matches the value i'm looking for. 
    if(current.player.name === name){
      //we have it
      //so the previous  next would be the current but now set it to current.next  taking current out of the equation 
      console.log("found and removing")
      const previous = current.previous;
      const next = current.next;
      previous.next = next; 
      next.previous = previous;
      this.count--;
      return true; //
    } else {
      console.log("Unable to find the name ")
      return null; 
    }
    
  }

  markActive(name){
    /** this will set the current person to be the active player */
    let current = this.head; 
    let checked = 0; 
    let activePlayer = null; 
    while(checked < this.count){
      if(current.player.name === name){
        console.log(`This is the players turn ${name}`)
        current.active = true; 
        activePlayer = current; 
      } else {
        current.active = false; 
      }
      
      current = current.next; 
      checked++; 
    }
    return activePlayer; 
  }
}
export default LinkedList; 
/*What makes this a circularl 
Circular Linked List is a variation of Linked list in which the first element points to the last element and the last element points to the first element. Both Singly Linked List and Doubly Linked List can be made into a circular linked list.

What makes this a doubly linked list is there is a previous and next option on each individual node. Meaning we can go forward or back.    
*/

//https://repl.it/@codejoncode/circular-linked-list-with-removal-function  used to test  


