import React, { useEffect, useState } from "react";

const Members = ({ text }) => {
  return (
    <div
      className={
        "dark:bg-primary bg-gray-400  p-4 rounded-lg shadow-lg dark:shadow-slate-400 shadow-slate-800 dark:text-text text-textLight font-semibold text-2xl w-4/5 mt-5 mb-5 border border-black"
      }
    >
      {text}
    </div>
  );
};

export default Members;
