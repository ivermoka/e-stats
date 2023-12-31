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
  const [dataFetched, setDataFetched] = useState(false);
  const [dataSchema, setDataSchema] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [hasRated, setHasRated] = useState(true);
  const [showToday, setShowToday] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSessionData();
    } else if (user === "no") {
      setLoaded(true);
    }
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
      setLoaded(true);
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
      {loaded ? (
        <>
          {user !== "no" && user ? (
            <>
              {showToday ? (
                <TimeStats user={user} />
              ) : (
                <>
                  <div className="dark:text-text text-textLight text-xl font-bold italic mt-12">
                    <h1>Personlig statistikk for </h1>
                    <span className="dark:text-orange-200 text-orange-700">
                      {user} - {new Date(value).toLocaleDateString("no-NO")}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCalendar(!showCalendar);
                    }}
                    className="dark:text-text text-textLight text-lg font-semibold border-2 dark:border-primary border-secondaryLight rounded-md px-4 py-2 my-2 w-40"
                  >
                    VELG DATO
                    <BsCalendar className="inline ml-2 mb-[2px]" />
                  </button>
                  {showCalendar && (
                    <Calendar
                      defaultValue={value}
                      className={
                        "dark:border-primary border-secondaryLight border-2 shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 font-semibold"
                      }
                      tileClassName={({ date }) => {
                        const isSelectedDate =
                          date.toLocaleDateString("en-US") === value;
                        return isSelectedDate
                          ? "selected-date-class dark:bg-[#F8D8B1] bg-[#305464] dark:text-black text-white p-2 dark: border-textLight dark:border"
                          : "p-2 dark:border-text border-textLight border";
                      }}
                      onClickDay={(day) => {
                        setValue(day.toLocaleDateString("en-US"));
                        setShowCalendar(false);
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
                  ) : (
                    <div className="dark:bg-primary bg-primaryLight rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 mt-4">
                      <h2 className="text-xl font-bold italic m-2">
                        Ingen data
                      </h2>
                      <div className="dark:bg-bg/50 bg-bgLight/50 rounded-lg p-2 text-center text-xl">
                        Det er ikke registrert noe data for den valgte dagen.
                        Vennligst gå til{" "}
                        <Link
                          className={"text-blue-500"}
                          href={"/egenvurdering"}
                        >
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
          ) : (
            <h1 className="dark:text-text text-textLight text-xl font-bold italic mt-14">
              Du må logge inn for å se personlig statistikk!
            </h1>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PersonalStats;
