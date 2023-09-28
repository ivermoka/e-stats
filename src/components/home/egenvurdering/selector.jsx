import React, { useState, useEffect } from "react";

const Selector = ({ showAfter, setShowAfter }) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (showAfter) {
      setSelected(1);
    } else {
      setSelected(0);
    }
  }, [showAfter]);
  return (
    <div
      className={
        "fixed left-1/2 -translate-x-1/2 bottom-28 dark:bg-primary/80 bg-primaryLight/80 backdrop-blur-lg dark:border-text border-textLight border-2 rounded-full w-20 h-12 flex justify-evenly items-center"
      }
    >
      <button
        onClick={() => {
          setShowAfter(false);
        }}
        className={`${
          selected === 0
            ? "dark:bg-text bg-textLight"
            : "dark:bg-secondary bg-secondaryLight"
        } rounded-full h-5 w-5`}
      ></button>
      <button
        onClick={() => {
          setShowAfter(true);
        }}
        className={`${
          selected === 1
            ? "dark:bg-text bg-textLight"
            : "dark:bg-secondary bg-secondaryLight"
        } rounded-full h-5 w-5`}
      ></button>
    </div>
  );
};

export default Selector;
