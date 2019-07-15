/**
 * Create string variations of the different cards that can be played back to back.
 *
 * this is based on value only
 *
 * 00 11 22 33 44 55 66 77 88 99
 *
 * 1010 1111 1212 1313 1414
 * ^^^^ STACKS
 * 1214   1412
 * ^^^ any form of draw can be placed on another
 *
 * count up or count down
 * 90   09   98 89 01 10 12 21  23 32
 * 34 43 45 54 56 65 67 76 78 87 89 98
 *
 * stacking a wild or a draw four on any random card
 * 014 114 214 314 414 514 614 714 814 914 013 113 213 313 413 513 613 713 813 913
 *
 *
 * Above is all the patterns for topcard and then adding to the top card.  Using a key pair object will provide big O 1  constant time loop
 * 
 * Order of conditionals 
 * if  topCard was an draw card  and if current draw flag is set  
 * else if  topCard.color === cardToInsert.color  
 * else if String(topCard.cardValue) + String(cardToInsert.cardValue) in stacks 
 * else if String(topCard.cardValue) + String(cardToInsert.cardValue) in counts
 *    this should trigger the  paramater to identify a count set up is being played so it can be checked. 
 * 
 * else if String(topCard.cardValue) + String(cardToInsert.cardValue) in actionCreators
 * else if this.colorIs   === cardToinsert.color   //  for when the last card was a draw 4 or wild and color changes
 * 
 * I want to print out a message to test what I am doing is accurately triggering the correct condition 
 * 
 * if cardToinsert.value in colorChangers  then I want to start displaying buttons for the user to select the color 
 * this choice should then use game.mainGampPlay function and insert the color into the switch statement. 
 * 
 */

const stacks = {
  "00": null,
  "11": null,
  "22": null,
  "33": null,
  "44": null,
  "55": null,
  "66": null,
  "77": null,
  "88": null,
  "99": null,
  "1010": null,
  "1111": null,
  "1212": null,
  "1313": null,
  "1414": null,
  "1214": null,
  "1412": null
};

const counts = {
  "90": null,
  "09": null,
  "98": null,
  "89": null,
  "01": null,
  "10": null,
  "12": null,
  "21": null,
  "23": null,
  "32": null,
  "34": null,
  "43": null,
  "45": null,
  "54": null,
  "56": null,
  "65": null,
  "67": null,
  "76": null,
  "78": null,
  "87": null,
  "89": null,
  "98": null
};

const actionCreators = {
  "014": null,
  "114": null,
  "214": null,
  "314": null,
  "414": null,
  "514": null,
  "614": null,
  "714": null,
  "814": null,
  "914": null,
  "013": null,
  "113": null,
  "213": null,
  "313": null,
  "413": null,
  "513": null,
  "613": null,
  "713": null,
  "813": null,
  "913": null
};

const draws = {
    "14": null, 
    "12": null
}

const colorChangers = {
    "14": null,
    "13": null,
}
