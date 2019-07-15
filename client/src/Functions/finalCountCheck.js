import {counts} from "./cardPlayHelper";

const finalCountCheck  = (playerInstance) => {
    //currently doesn't consider order but this should not cause a problem as they will need 3 distinct numbers going in either direction
    //also the way the cards are added ordered is then considred
    console.log("Checking users count")
    const hand = playerInstance.gatherForPlay;
    if (hand.length >= 3) {
      const cache = [];
      //build the cache every time we add a card
      for (let card of hand) {
        if (card.countable) {
          if (cache.includes(card.cardValue) === false){
              cache.push(card.cardValue);
              if(cache.length  >= 3){
                  console.log("No need to go through the entire loop 3 distinct cards there");
                  return true; 
              }
          }
        }
      }
       
      console.log("For loop for finalCount check completed ")
      
    } else {
        console.log("You can't do any counting because of the fact that you don't have at least 3 cards playing");
        return false; 
    }
  }

export default finalCountCheck; 