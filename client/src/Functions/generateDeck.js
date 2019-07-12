const generateDeck = (decksToGenerate = 1) => {
    /**
     * Will generate one deck by default unless another number is provided. 
     * will generate every card needed to play the game 
     * returns the deck generaged 
     */

const deck = [

]
// skips will be index 10 
/// reverses = 11   
// draw 2 = 12 
// wild == 13 
// draw4 = 14 

/**
 * zero's one per color
 * 1-9 two per color red blue yellow green
 * draw 2  two per color 
 * reverses two per color 
 * skips two per color
 * wild  4 total 
 * draw4  4 total 
 * 
 */
const colors = ["blue", "yellow", "green", "red"];
for (let d = 0;  d < decksToGenerate; d++){
  for(let index = 0; index < 15; index++){
    if (index === 0){
    for (let color of colors){
      deck.push({number : index, color})
    }
    }
    else if (index === 10){
      for(let color of colors){
        deck.push({number: "skip", color });
        deck.push({number: "skip", color });
      }
    }

    else if (index === 11)
    {
      for(let color of colors){
        deck.push({number: "reverse", color});
        deck.push({number: "reverse", color});
      }
    }
    else if (index === 12)
    {
    //need two of each color. 
    for(let color of colors){
      const objDraw2_1 = {number: "draw2", color, drawValue: 2 };
      const objDraw2_2 = {number: "draw2", color, drawValue: 2 };
      deck.push(objDraw2_1);
      deck.push(objDraw2_2);
    }
    }
    else if ( index === 13){
      // wild  
      const objWild1 = {number: "wild", color: "wild"};
      const objWild2 = {number: "wild", color: "wild"};
      const objWild3 = {number: "wild", color: "wild"};
      const objWild4 = {number: "wild", color: "wild"};
      const addIns = [objWild1, objWild2, objWild3, objWild4];
      for (let card of addIns){
        deck.push(card);
      }
    }
    else if (index === 14){
      // draw4 
      const objDraw4_1 = {number: "draw4", color: "draw4", drawValue : 4};
      const objDraw4_2 = {number: "draw4", color: "draw4", drawValue : 4};
      const objDraw4_3 = {number: "draw4", color: "draw4", drawValue : 4};
      const objDraw4_4 = {number: "draw4", color: "draw4", drawValue : 4};
      const addIns = [objDraw4_1, objDraw4_2, objDraw4_3, objDraw4_4];
      for (let card of addIns){
        deck.push(card);
      }
    }
    else {
      for (let color of colors){
        deck.push({number: index, color});
        deck.push({number: index, color});
      }
    }
  }
}

return deck
}

export default generateDeck;