class Player {
    constructor(name){
      this.name = name; 
      this.hand = []; 
      this.cardsLeft = this.hand.length; 
    }
  
    addToPlayersHand(card) {
      this.hand.push(card);
    }
  
    organizePlayersHand(type){
      //sort the players hand based on current color, 
      if(type === "color"){
  
      }
      //sort the players hand based on type/ number , 
      else if (type === "number"){
  
      }
      //sort the players hand from least to greatest, 
      else if (type === "least"){
  
      }
      //sort the players hand from greatest to least
      else if (type === "greatest"){
  
      }
    }
  
    
  }