/**
 * Should use the stacks counts actionCreators draws and color Changes  objects 
 * should return true or false based off if the move is valid. 
 * may want to return a string to place in the switch instead of true or false 
 */
import {stacks, counts, actionCreators, draws} from "./cardPlayHelper";

const playCardAssistor = (topCard, cardToInsert, currentColor, drawFlag) => {
    //format to string the cardvalue of the topCard and cardToInsert 
    const top = String(topCard.cardValue);
    const next = String(cardToInsert.cardValue);
    //concatentate the topCard and the cardToInsert values 
    const pair = top + next; 
    // check if topCards was a draw card and if current draw flag is set meaning
    //cards are still waiting to be picked up or a player can defend themselves and fire back
    if(top in draws && drawFlag){
        console.log("Cards need to be picked up or player can defend themselves");
        if (next in draws){
            console.log("The player has chosen to add to the draw stack");
            return true; 
        } else {
            console.log("This is not a draw card if player doesn't have one need to pick up");
            return false;
        }
    } else if (topCard.color === cardToInsert.color){
        //color matches and its not a draw let's move forward 
        console.log("color matches and its not a draw let's move forward ");
        return true; 
    } else if (pair in stacks){
        //stacking  
        console.log("stacking");
        return true; 
    } else if (pair in counts){
        //counting is being done 
        console.log("counting is being done ");
        return true; 
    }  else if (pair in actionCreators) {
        //wild or draw4 action required 
        console.log("wild or draw4 played action required");
    } else if(currentColor === cardToInsert.color){
        //wild or draw4 is on top but no draw penalty to this player 
        console.log("wild or draw4 is on top but no draw penalty to this player");
    } else {
        console.log("This is is something that has not been considered");
        console.log(`${top} | ${next}`);
    }
}

export default playCardAssistor;