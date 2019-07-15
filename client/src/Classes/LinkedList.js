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

  append (value) {
    const newNode = {};
    newNode.value = value; 
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
  remove(value){
    /**
     * search for value then remove it 
     */
    let current = this.head; 
    //it's a circular linked list so this will loop forever if the value doesn't exist 
    let checked = 0; //increment each time we go next 
    while(current.value != value || checked < this.count){
      current = current.next; 
      checked++; 
    }
    //at this point because I avoided the infinite loop I still have to check if the value of current matches the value i'm looking for. 
    if(current.value === value){
      //we have it
      //so the previous  next would be the current but now set it to current.next  taking current out of the equation 
      current.previous.next = current.next;  
      this.count--;
      return true; //
    } else 
    return null; 

  }
}
export default LinkedList; 
/*What makes this a circularl 
Circular Linked List is a variation of Linked list in which the first element points to the last element and the last element points to the first element. Both Singly Linked List and Doubly Linked List can be made into a circular linked list.

What makes this a doubly linked list is there is a previous and next option on each individual node. Meaning we can go forward or back.    
*/

//https://repl.it/@codejoncode/circular-linked-list-with-removal-function  used to test  


