const playersLeft = (playersDoublyCircularLinkedList) => {
    /**
     *  will need to know the player name and or how many cards they have 
     * may delete this file  now that I am performing the check if a player has zero cards on each iteration of 
     * changing turns I can use the  linked list  count  to see how many players are left. 
     */
    let stillPlaying = 0; 

    let current = playersDoublyCircularLinkedList.head; 
    let checked = 0; 
    while(checked < playersDoublyCircularLinkedList.count){
        if(current.player.hand.length > 0){
            stillPlaying++; 
        }
        current = current.next; 
        checked++; 
    }

    //for now I want to log to the console if the stillPlaying matches up with  the count on the doublyLinkedList 
    console.log(`count matches stillPlaying === ${playersDoublyCircularLinkedList.count === stillPlaying}`);
    //using this as a tester for now 
    
    return stillPlaying; 
}

export default playersLeft; 