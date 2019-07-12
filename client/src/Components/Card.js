import React from "react";

//the card property is needed and should be an object with at least a value to be displayed and a color
const Card = ({ card }) => {
  return (
    <div className = {`card num-${card.value} ${card.color}`}>
      <span class="inner">
        <span class="mark">{card.value}</span>
      </span>
    </div>
  );
};

export default Card;
