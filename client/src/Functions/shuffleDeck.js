const shuffleDeck = (deck) => {
    /**
     * This function works in big O of n  run time using the swapping technique to iterate over the list and swap out cards 
     * This will shuffle the deck in the most optimal time available. 
     * returns the shuffled deck 
     */
    for (let i = deck.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp; 
    }
    return deck; 
}

export default shuffleDeck;