import { BsCalendar } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import React from "react";
import SelectStat from "@/components/stats/overTimeStats/selectStat";

const StatsOverTime = () => {
  const boxStyle =
    "dark:bg-primary bg-primaryLight p-2 rounded-lg shadow-md dark:shadow-accent shadow-accentLight";
  return (
    <div className={"dark:text-text text-textLight font-bold mb-28"}>
      <h1 className={"mt-6  text-xl  italic"}>Statistikk over tid</h1>
      <div className={"flex justify-around"}>
        <button className={`${boxStyle} my-4`}>
          STATISTIKK
          <AiOutlineLineChart className="inline ml-2 mb-[2px] text-xl" />
          <SelectStat />
        </button>
        <button className={`${boxStyle} my-4`}>
          TIDSINTERVALL
          <BsCalendar className="inline ml-2 mb-[2px]" />
        </button>
      </div>
    </div>
  );
};

export default StatsOverTime;
