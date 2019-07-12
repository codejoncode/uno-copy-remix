import React from "react";

const Card = ({ value }) => {
  return (
    <div className = {`card num-${value} blue`}>
      <span class="inner">
        <span class="mark">{value}</span>
      </span>
    </div>
  );
};

export default Card;
