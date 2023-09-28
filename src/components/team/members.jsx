import React, { useEffect, useState } from "react";

const Members = ({ text }) => {
  return (
    <div
      className={
        "dark:bg-primary bg-primaryLight p-4 rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight font-semibold text-2xl"
      }
    >
      {text}
    </div>
  );
};

export default Members;
