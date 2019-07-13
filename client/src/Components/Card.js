import React from "react";

//the card property is needed and should be an object with at least a value to be displayed and a color
const Card = ({ card }) => {

  return (
    <div className = {`card num-${card.number} ${card.color}`}>
      <span className="inner">
        <span className="mark">{card.number}</span>
      </span>
    </div>
  );
};

export default Card;
