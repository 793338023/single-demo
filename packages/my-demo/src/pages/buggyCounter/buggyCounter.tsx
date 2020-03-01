import React, { useState } from "react";

interface Props {
  title: string;
}

const BuggyCounter: React.FC<Props> = props => {
  const [count, setcount] = useState(0);
  const handleClick = () => {
    const newCount = count + 1;
    setcount(newCount);
  };
  if (count === 5) {
    // Simulate a JS error
    throw new Error("I crashed!");
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <div onClick={handleClick}>click: {count}</div>
    </div>
  );
};

export default BuggyCounter;
