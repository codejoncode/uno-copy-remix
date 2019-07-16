/**
 * Going to receive a doubly circular linked list and turn it into an array. 
 * 
 */
const linkedListToArray = (doublyCircularLinkedList) => {
    const returning = []; 
    if (doublyCircularLinkedList.count > 0){
        let current = doublyCircularLinkedList.head; 
        //there are current.player instead of current.value   available 
        
        //due to the linked lists circular keep track of count 
        let checked = 0; 
        while(checked < doublyCircularLinkedList.count){
            returning.push(current.player);
            checked++; 
            current = current.next; 
        }

    } else {
        console.log("The linked list is empty");
        return returning; 
    }
}

export default linkedListToArray; 