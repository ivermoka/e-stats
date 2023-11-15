import { LineChart } from "@/components/stats/overTimeStats/lineChart";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

const StatsOverTime = ({ user }) => {
  const [fromDate, setFromDate] = useState(
    new Date().toLocaleDateString("en-US"),
  );
  const [toDate, setToDate] = useState(new Date().toLocaleDateString("en-US"));

  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    getStats();
  }, [fromDate, toDate]);

  const getStats = async () => {
    try {
      const res = await fetch(
        `/api/fetchUser?user=${user}&fromDate=${fromDate}&toDate=${toDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        console.log(await res.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    <div
      className={
        "dark:text-text text-textLight font-bold mb-28 flex flex-col gap-2"
      }
    >
      <h1 className={"mt-12  text-xl  italic"}>Statistikk over tid</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
          type="button"
          className="dark:text-text text-textLight font-bold py-2 px-4 rounded-md border-2 dark:border-primary border-secondaryLight shadow-lg dark:shadow-accent shadow-accentLight"
        >
          {new Date(fromDate).toLocaleDateString("no-NO")}
        </button>
      </div>
      {showCalendar && (
        <Calendar
          tileClassName={({ date }) => {
            const isSelectedDate =
              date.toLocaleDateString("en-US") === fromDate;
            return isSelectedDate
              ? "selected-date-class dark:bg-[#F8D8B1] bg-[#305464] dark:text-black text-white p-2 dark: border-textLight dark:border"
              : "p-2 dark:border-text border-textLight border";
          }}
          className="dark:border-primary border-secondaryLight border-2 shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 font-semibold"
          onClickDay={(day) => {
            setToDate(new Date(day).toLocaleDateString("en-US"));
          }}
        />
      )}
      <LineChart data={data} options={options} />
    </div>
  );
};

export default StatsOverTime;
