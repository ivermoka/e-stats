import Calendar from "react-calendar";
import { BarChart } from "./barChart";
import React, { useState, useEffect } from "react";
import Loading from "../loading";
import { BsCalendar } from "react-icons/bs";
import Link from "next/link";
import TimeStats from "@/components/stats/overTimeStats/timeStats";
import Selector from "../home/egenvurdering/selector";

const PersonalStats = ({ user }) => {
  const [value, setValue] = useState(new Date().toLocaleDateString("en-US"));
  const [date, setDate] = useState(new Date().toLocaleDateString("no-NO"));
  const [dataFetched, setDataFetched] = useState(false);
  const [dataSchema, setDataSchema] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [hasRated, setHasRated] = useState(true);
  const [showToday, setShowToday] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("no-NO"),
  );

  useEffect(() => {
    if (user) {
      fetchSessionData().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, value]);

  const fetchSessionData = async () => {
    try {
      const res = await fetch(`/api/fetchUser?user=${user}&date=${value}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setDataSchema(data.userSchema);
        setDataFetched(true);
        setHasRated(true);
      } else if (res.status === 201) {
        setDataFetched(true);
        setHasRated(false);
      } else {
        console.log("Could not fetch session data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Statistikk for valgt dag",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Kategorier",
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
    barThickness: 20,
    maintainAspectRatio: false,
    layout: {
      padding: {},
    },
  };

  return (
    <>
      {showToday ? (
        <TimeStats />
      ) : (
        <>
          <div className="dark:text-text text-textLight text-xl font-bold italic mt-12">
            <h1>Personlig statistikk for </h1>
            <span className="dark:text-orange-200 text-orange-700">
              {user} - {date}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowCalendar(!showCalendar);
            }}
            className="dark:text-text text-textLight font-bold py-2 px-4 rounded-lg dark:bg-primary bg-primaryLight shadow-md dark:shadow-accent shadow-accentLight my-4 w-40"
          >
            VELG DATO
            <BsCalendar className="inline ml-2 mb-[2px]" />
          </button>
          {showCalendar && (
            <Calendar
              defaultValue={date}
              className={`dark:bg-primary bg-primaryLight shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 font-semibold`}
              tileClassName={({ date }) => {
                const isSelectedDate =
                  date.toLocaleDateString("no-NO") === currentDate;
                return isSelectedDate
                  ? "selected-date-class dark:bg-[#F8D8B1] bg-[#305464] dark:text-black text-white p-2 dark: border-textLight dark:border"
                  : "p-2 dark:border-text border-textLight border";
              }}
              onClickDay={(day) => {
                setDate(day.toLocaleDateString("no-NO"));
                setValue(day.toLocaleDateString("en-US"));
                setShowCalendar(false);
                setCurrentDate(day.toLocaleDateString("no-NO"));
              }}
              value={value}
            />
          )}
          {hasRated && dataFetched && dataSchema ? (
            <div>
              <div className="h-80 ">
                <BarChart
                  data={{
                    labels: [
                      "Mat",
                      "Søvn",
                      "Motivasjon",
                      "Fysisk",
                      "Psykisk",
                      "Spilte",
                    ],
                    datasets: [
                      {
                        label: "Rating",
                        backgroundColor: [
                          "#33cc33",
                          "#0066ff",
                          "#ccff33",
                          "#EB565B",
                          "#ffff99",
                          "#ff0066",
                        ],
                        data: [
                          dataSchema.disclosure1,
                          dataSchema.disclosure2,
                          dataSchema.disclosure3,
                          dataSchema.disclosure4,
                          dataSchema.disclosure5,
                          dataSchema.disclosure6,
                        ],
                      },
                    ],
                  }}
                  options={options}
                />
              </div>
              <div className="dark:bg-primary bg-primaryLight rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 mt-4 mb-36">
                <h2 className="text-xl font-bold italic m-2">
                  Kommentar for dagen
                </h2>
                <div className="dark:bg-bg/50 bg-bgLight/50 rounded-lg p-2 break-words">
                  {dataSchema.comment}
                </div>
              </div>
            </div>
          ) : hasRated && !dataFetched ? (
            <div className="flex flex-col items-center text-text text-lg mt-14">
              <Loading />
            </div>
          ) : (
            <div className="dark:bg-primary bg-primaryLight rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 mt-4">
              <h2 className="text-xl font-bold italic m-2">Ingen data</h2>
              <div className="dark:bg-bg/50 bg-bgLight/50 rounded-lg p-2 text-center text-xl">
                Det er ikke registrert noe data for den valgte dagen. Vennligst
                gå til{" "}
                <Link className={"text-blue-500"} href={"/egenvurdering"}>
                  egenvurdering
                </Link>{" "}
                hvis du vil registrere data for i dag.
              </div>
            </div>
          )}
        </>
      )}
      <Selector showAfter={showToday} setShowAfter={setShowToday} />
    </>
  );
};

export default PersonalStats;
