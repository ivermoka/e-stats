import { LineChart } from "@/components/stats/overTimeStats/lineChart";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Loading from "@/components/loading";

const StatsOverTime = ({ user }) => {
  const [loaded, setLoaded] = useState(false);
  const [stats, setStats] = useState(null);
  const [fromDate, setFromDate] = useState(
    new Date().toLocaleDateString("en-US"),
  );
  const [showFromCalendar, setShowFromCalendar] = useState(false);

  const [toDate, setToDate] = useState(new Date().toLocaleDateString("en-US"));
  const [showToCalendar, setShowToCalendar] = useState(false);

  const isDateInRange = (date) => {
    return date >= new Date(fromDate) && date <= new Date(toDate);
  };

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
        const data = await res.json();
        setStats(data.ratings);
        console.log(data.ratings);
        setLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Statistikk over tid",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Dato",
        },
      },
      y: {
        title: {
          display: true,
          text: "Vurdering",
        },
        min: 0,
        max: 10,
      },
    },
  };

  const calendarStyle =
    "dark:border-primary border-secondaryLight border-2 shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 font-semibold";

  const tileStyle = ({ date }) => {
    const isSelectedDate = date.toLocaleDateString("en-US") === fromDate;
    const isInRange = isDateInRange(date);

    return isSelectedDate
      ? "selected-date-class dark:bg-[#F8D8B1] bg-[#305464] dark:text-black text-white p-2 dark:border-textLight dark:border"
      : isInRange
      ? "range-date-class dark:bg-[#F8D8B1] bg-[#305464] dark:text-black text-white p-2 dark:border-textLight dark:border"
      : "p-2 dark:border-text border-textLight border";
  };

  return (
    <>
      {loaded ? (
        <div
          className={
            "dark:text-text text-textLight font-bold mb-28 flex flex-col gap-2"
          }
        >
          <h1 className={"mt-12  text-xl  italic"}>Statistikk over tid</h1>
          <div className="flex items-center gap-2 dark:text-text text-textLight font-bold">
            <button
              onClick={() => {
                setShowFromCalendar(!showFromCalendar);
                setShowToCalendar(false);
              }}
              type="button"
              className={`${
                showFromCalendar ? "bg-secondaryLight dark:bg-primary" : ""
              } py-2 px-4 rounded-md border-2 dark:border-primary border-secondaryLight`}
            >
              {new Date(fromDate).toLocaleDateString("no-NO")}
            </button>
            -
            <button
              onClick={() => {
                setShowToCalendar(!showToCalendar);
                setShowFromCalendar(false);
              }}
              type="button"
              className={`${
                showToCalendar ? "bg-secondaryLight dark:bg-primary" : ""
              } py-2 px-4 rounded-md border-2 dark:border-primary border-secondaryLight`}
            >
              {new Date(toDate).toLocaleDateString("no-NO")}
            </button>
          </div>
          {showFromCalendar && (
            <Calendar
              tileClassName={tileStyle}
              className={calendarStyle}
              onClickDay={(day) => {
                setFromDate(new Date(day).toLocaleDateString("en-US"));
              }}
            />
          )}
          {showToCalendar && (
            <Calendar
              tileClassName={tileStyle}
              className={calendarStyle}
              onClickDay={(day) => {
                setToDate(new Date(day).toLocaleDateString("en-US"));
              }}
            />
          )}
          <div className="md:h-96 h-72">
            <LineChart
              data={{
                labels: stats.map((date) =>
                  new Intl.DateTimeFormat("no-NO", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  }).format(new Date(date.date)),
                ),
                datasets: [
                  {
                    label: "Mat",
                    data: stats.map((stat) => stat.disclosure1),
                    backgroundColor: "#33cc33",
                    borderColor: "#33cc33",
                  },
                  {
                    label: "Søvn",
                    data: stats.map((stat) => stat.disclosure2),
                    backgroundColor: "#0066ff",
                    borderColor: "#0066ff",
                    hidden: true,
                  },
                  {
                    label: "Motivasjon",
                    data: stats.map((stat) => stat.disclosure3),
                    backgroundColor: "#ccff33",
                    borderColor: "#ccff33",
                    hidden: true,
                  },
                  {
                    label: "Fysisk",
                    data: stats.map((stat) => stat.disclosure4),
                    backgroundColor: "#EB565B",
                    borderColor: "#EB565B",
                    hidden: true,
                  },
                  {
                    label: "Psykisk",
                    data: stats.map((stat) => stat.disclosure5),
                    backgroundColor: "#ffff99",
                    borderColor: "#ffff99",
                    hidden: true,
                  },
                  {
                    label: "Spilte",
                    data: stats.map((stat) => stat.disclosure6),
                    backgroundColor: "#ff0066",
                    borderColor: "#ff0066",
                    hidden: true,
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default StatsOverTime;
