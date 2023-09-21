import React, { useState } from "react";

const Selector = ({ showAfter, setShowAfter }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div
      className={
        "fixed left-1/2 -translate-x-1/2 bottom-28 bg-primary/80 backdrop-blur-lg border-text border-2 rounded-full w-20 h-12 flex justify-evenly items-center"
      }
    >
      <button
        onClick={() => {
          setShowAfter(false);
          setSelected(0);
        }}
        className={`${
          selected === 0 ? "bg-text" : "bg-secondary"
        } rounded-full h-5 w-5`}
      ></button>
      <button
        onClick={() => {
          setShowAfter(true);
          setSelected(1);
        }}
        className={`${
          selected === 1 ? "bg-text" : "bg-secondary"
        } rounded-full h-5 w-5`}
      ></button>
    </div>
  );
};

export default Selector;
