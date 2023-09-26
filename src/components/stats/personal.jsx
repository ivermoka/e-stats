import Calendar from "react-calendar";
import { BarChart } from "./barChart";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { BsCalendar } from "react-icons/bs";
import Link from "next/link";
import moment from "moment-timezone";

const PersonalStats = () => {
  const norwegianTimezone = "Europe/Oslo";
  //
  const [value, setValue] = useState(
    moment.tz(norwegianTimezone).format("MM-DD-YYYY")
  );
  const [user, setUser] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [dataSchema, setDataSchema] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [hasRated, setHasRated] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);

  useEffect(() => {
    if (user) {
      getUser().then();
      fetchSessionData().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, value]);

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
        min: 0, // Set the minimum value for the y-axis scale
        max: 10, // Set the maximum value for the y-axis scale
      },
    },
    barThickness: 20,
    maintainAspectRatio: false,
    layout: {
      padding: {},
    },
  };

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
        console.log("Fetched Session Data:", data); // Debugging: Print fetched data
        setDataSchema(data.userSchema);
        setDataFetched(true);
      } else {
        console.log("Could not fetch session data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    if (dataSchema) {
      try {
        const res = await fetch(`/api/getUser?user=${user}&date=${value}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 202) {
          setHasRated(true);
          console.log("User has rated"); // Debugging: Print user rating
        } else if (res.status === 201) {
          setHasRated(false);
          console.log("User has not rated"); // Debugging: Print user not rated
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="text-text text-xl font-bold italic mt-12">
        <h1>Personlig statistikk for </h1>
        <span className="text-orange-200">
          {user} - {value}
        </span>
      </div>
      <button
        onClick={() => {
          setShowCalendar(!showCalendar);
        }}
        className="text-text font-bold py-2 px-4 rounded-lg bg-primary shadow-md shadow-accent my-4"
      >
        VELG DATO
        <BsCalendar className="inline ml-2 mb-[2px]" />
      </button>
      {showCalendar && (
        <Calendar
          className={`bg-primary rounded-lg shadow-md shadow-accent text-text p-2 font-semibold`}
          tileClassName={"p-2 border-text border-2 rounded-lg"}
          onClickDay={(day) => {
            // Convert 'day' to a JavaScript Date object
            const selectedDate = new Date(day);

            // Debugging: Print the selectedDate
            console.log("Selected Date:", selectedDate);

            // Format the selected date in the Norwegian timezone
            const formattedDate = moment(selectedDate)
              .tz(norwegianTimezone)
              .format("MM-DD-YYYY");

            // Debugging: Print the formatted date
            console.log("Formatted Date:", formattedDate);

            setValue(formattedDate);
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
          <div className="bg-primary rounded-lg shadow-md shadow-accent text-text p-2 mt-4">
            <h2 className="text-xl font-bold italic m-2">
              Kommentar for dagen
            </h2>
            <div className="text-text bg-bg/50 rounded-lg p-2">
              {dataSchema.comment}
            </div>
          </div>
        </div>
      ) : hasRated && !dataFetched ? (
        <div className="flex flex-col items-center text-text text-lg">
          <p>Laster personlig data</p>
          <ReactLoading type={"bars"} color={"#1C1B29"} width={200} />
        </div>
      ) : (
        <div className="bg-primary rounded-lg shadow-md shadow-accent text-text p-2 mt-4">
          <h2 className="text-xl font-bold italic m-2">Ingen data</h2>
          <div className="text-text bg-bg/50 rounded-lg p-2 text-center text-xl">
            Det er ikke registrert noe data for den valgte dagen. Vennligst gå
            til{" "}
            <Link className={"text-blue-500"} href={"/egenvurdering"}>
              egenvurdering
            </Link>{" "}
            hvis du vil registrere data for i dag.
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalStats;
