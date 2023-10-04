import { BsCalendar } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import React from "react";
import SelectStat from "@/components/stats/overTimeStats/selectStat";
import { useState } from "react";
import { LineChart } from "@/components/stats/overTimeStats/lineChart";

const StatsOverTime = () => {
  const [statsDropdownOpen, setStatsDropdownOpen] = useState(false);
  const boxStyle =
    "dark:bg-primary bg-primaryLight p-2 rounded-lg shadow-md dark:shadow-accent shadow-accentLight";

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Statistikk over tid",
      },
    },
  };

  const labels = ["Januar", "Februar", "Mars", "April", "Mai", "Juni"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Din vurdering",
        data: [5, 6, 7, 8, 9, 10],
      },
    ],
  };

  return (
    <div className={"dark:text-text text-textLight font-bold mb-28"}>
      <h1 className={"mt-6  text-xl  italic"}>Statistikk over tid</h1>
      <div className={"flex justify-around"}>
        <div>
          <button
            onClick={() => setStatsDropdownOpen(!statsDropdownOpen)}
            className={`${boxStyle} my-4`}
          >
            STATISTIKK
            <AiOutlineLineChart className="inline ml-2 mb-[2px] text-xl" />
          </button>
          {statsDropdownOpen && (
            <SelectStat setStatsDropdownOpen={setStatsDropdownOpen} />
          )}
        </div>

        <button className={`${boxStyle} my-4`}>
          TIDSINTERVALL
          <BsCalendar className="inline ml-2 mb-[2px]" />
        </button>
      </div>
    </div>
  );
};

export default StatsOverTime;
