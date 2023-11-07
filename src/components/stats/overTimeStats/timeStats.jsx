import { LineChart } from "@/components/stats/overTimeStats/lineChart";
import { useState } from "react";
import Calendar from "react-calendar";

const StatsOverTime = () => {
  const [fromDate, setFromDate] = useState(
    new Date().toLocaleDateString("no-NO"),
  );
  const [showFromCalendar, setShowFromCalendar] = useState(false);

  const [toDate, setToDate] = useState(new Date().toLocaleDateString("no-NO"));
  const [showToCalendar, setShowToCalendar] = useState(false);

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

  const calendarStyle =
    "dark:border-primary border-secondaryLight border-2 shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 font-semibold";

  const tileStyle = ({ date }) => {
    const isSelectedDate = date.toLocaleDateString("no-NO") === fromDate;
    return isSelectedDate
      ? "selected-date-class dark:bg-[#F8D8B1] bg-[#305464] dark:text-black text-white p-2 dark: border-textLight dark:border"
      : "p-2 dark:border-text border-textLight border";
  };

  return (
    <div
      className={
        "dark:text-text text-textLight font-bold mb-28 flex flex-col gap-2"
      }
    >
      <h1 className={"mt-12  text-xl  italic"}>Statistikk over tid</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setShowToCalendar(!showToCalendar);
            setShowFromCalendar(false);
          }}
          type="button"
          className="dark:text-text text-textLight font-bold py-2 px-4 rounded-md border-2 dark:border-primary border-secondaryLight shadow-lg dark:shadow-accent shadow-accentLight"
        >
          {fromDate}
        </button>
        -
        <button
          onClick={() => {
            setShowToCalendar(!showToCalendar);
            setShowFromCalendar(false);
          }}
          type="button"
          className="dark:text-text text-textLight font-bold py-2 px-4 rounded-md border-2 dark:border-primary border-secondaryLight shadow-lg dark:shadow-accent shadow-accentLight"
        >
          {toDate}
        </button>
      </div>
      {showToCalendar && (
        <Calendar
          tileClassName={tileStyle}
          className={calendarStyle}
          onClickDay={(day) => {
            setFromDate(new Date(day).toLocaleDateString("no-NO"));
          }}
        />
      )}
      {showFromCalendar && (
        <Calendar
          tileClassName={tileStyle}
          className={calendarStyle}
          onClickDay={(day) => {
            setToDate(new Date(day).toLocaleDateString("no-NO"));
          }}
        />
      )}
      <LineChart data={data} options={options} />
    </div>
  );
};

export default StatsOverTime;
