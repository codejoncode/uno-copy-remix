const generateDeck = (decksToGenerate = 1) => {
  /**
   * Will generate one deck by default unless another number is provided.
   * will generate every card needed to play the game
   * returns the deck generaged
   */
  const SKIP = 10;
  const REVERSE = 11;
  const DRAW2 = 12;
  const WILD = 13;
  const DRAW4 = 14;
  const deck = [];
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
  let uniqueNumber = 0; // could be useful because some cards are exactly the same and so have to know if there is a difference

  for (let d = 0; d < decksToGenerate; d++) {
    for (let index = 0; index < 15; index++) {
      if (index === 0) {
        for (let color of colors) {
          deck.push({ number: index, color, cardValue: index, cardClass: index, uniqueNumber});
          uniqueNumber++;
        }
      } else if (index === SKIP) {
        for (let color of colors) {
          deck.push({ number: "\u2298", color, cardValue: index, cardClass: "skip", uniqueNumber: uniqueNumber + 1});
          deck.push({ number: "\u2298", color, cardValue: index, cardClass: "skip", uniqueNumber: uniqueNumber + 2 });
          uniqueNumber += 2; 
        }
      } else if (index === REVERSE) {
        for (let color of colors) {
          deck.push({ number: "\u267B", color, cardValue: index, cardClass: "reverse", uniqueNumber: uniqueNumber + 1 });
          deck.push({ number: "\u267B", color, cardValue: index, cardClass: "reverse", uniqueNumber: uniqueNumber + 2 });
          uniqueNumber += 2;
        }
      } else if (index === DRAW2) {
        //need two of each color.
        for (let color of colors) {
          const objDraw2_1 = {
            number: "\u2681",
            color,
            drawValue: 2,
            cardValue: index,
            cardClass: "draw2",
            uniqueNumber: uniqueNumber + 1
          };
          const objDraw2_2 = {
            number: "\u2681",
            color,
            drawValue: 2,
            cardValue: index,
            cardClass: "draw2",
            uniqueNumber: uniqueNumber + 2
          };
          deck.push(objDraw2_1);
          deck.push(objDraw2_2);
          uniqueNumber += 2; 
        }
      } else if (index === WILD) {
        // wild
        const objWild1 = { number: "\u1f308", color: "black", cardValue: index, cardClass : "wild", uniqueNumber: uniqueNumber + 1 };
        const objWild2 = { number: "\u1f308", color: "black", cardValue: index, cardClass : "wild", uniqueNumber: uniqueNumber + 2 };
        const objWild3 = { number: "\u1f308", color: "black", cardValue: index, cardClass : "wild", uniqueNumber: uniqueNumber + 3 };
        const objWild4 = { number: "\u1f308", color: "black", cardValue: index, cardClass : "wild", uniqueNumber: uniqueNumber + 4 };
        uniqueNumber += 4; 
        const addIns = [objWild1, objWild2, objWild3, objWild4];
        for (let card of addIns) {
          deck.push(card);
        }
      } else if (index === DRAW4) {
        // draw4
        const objDraw4_1 = {
          number: "\u2683",
          color: "black",
          drawValue: 4,
          cardValue: index,
          cardClass : "draw4",
          uniqueNumber: uniqueNumber + 1, 
        };
        const objDraw4_2 = {
          number: "\u2683",
          color: "black",
          drawValue: 4,
          cardValue: index,
          cardClass : "draw4",
          uniqueNumber: uniqueNumber + 2,
        };
        const objDraw4_3 = {
          number: "\u2683",
          color: "black",
          drawValue: 4,
          cardValue: index,
          cardClass : "draw4",
          uniqueNumber: uniqueNumber + 3,
        };
        const objDraw4_4 = {
          number: "\u2683",
          color: "black",
          drawValue: 4,
          cardValue: index,
          cardClass : "draw4",
          uniqueNumber: uniqueNumber + 4
        };
        uniqueNumber += 4; 
        const addIns = [objDraw4_1, objDraw4_2, objDraw4_3, objDraw4_4];
        for (let card of addIns) {
          deck.push(card);
        }
      } else {
        for (let color of colors) {
          deck.push({ number: index, color, cardValue: index, cardClass: index, uniqueNumber: uniqueNumber + 1 });
          deck.push({ number: index, color, cardValue: index, cardClass: index, uniqueNumber: uniqueNumber + 2 });
          uniqueNumber += 2; 
        }
      }
    }
  }
  return deck;
};

export default generateDeck;
