import React, { useEffect, useState } from "react";

const Members = ({ text }) => {
  const boxStyle =
    "bg-primary p-4 rounded-lg shadow-md shadow-accent text-text font-semibold text-2xl";
  return <div className={boxStyle}>{text}</div>;
};

export default Members;
