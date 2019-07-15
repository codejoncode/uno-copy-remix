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
        this.head.previous = this.tail; 
      }
      this.count++;
    }
}

const newList = new LinkedList(); 

newList.append(0);
newList.append(1);
newList.append(2);
newList.append(3);
newList.append(4);
newList.append(5);
newList.append(6);
newList.append(7);
newList.append(8);
newList.append(9);

let keepTrack = 0;
// let current = newList.head;
let current = newList.tail; 
while(keepTrack < 100){
  console.log(current.value);
  // current = current.next; 
  current = current.previous
  keepTrack += 1; 
}
//goes round and round   
//uses previous and next just fine; 

