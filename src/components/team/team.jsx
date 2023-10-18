import React, { useEffect, useState } from "react";

const Team = ({ text, setSelectedTeam }) => {
  return (
    <div
      className={
        "dark:bg-primary bg-primaryLight p-4 rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight font-semibold text-2xl w-full flex justify-between items-center"
      }
    >
      {text}
      <button onClick={() => setSelectedTeam(text)}>Join</button>
    </div>
  );
};

export default Team;
