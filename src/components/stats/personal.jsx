import { set } from "mongoose";
import { BarChart } from "./barChart";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import VelgDatoBoks from "@/pages/stats/statscalendartest";

const PersonalStats = () => {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [dataFetched, setDataFetched] = useState(false);
  const [dataSchema, setDataSchema] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);

  useEffect(() => {
    if (user && dataFetched === false) {
      fetchSessionData();
    }
  }, [user]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Statistikk for valgt dag",
      },
    },
  };

  const fetchSessionData = async () => {
    try {
      const res = await fetch(`/api/fetchUser?user=${user}&date=${date}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setDataSchema(data.userSchema);
        setDate(data.userSchema.date);
        setDataFetched(true);
      } else {
        console.log("Could not fetch session data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-text text-xl font-bold italic">
        Personlig statistikk for{" "}
        <span className="text-orange-200">
          {user}, {date}
        </span>
      </h1>
      <button className="text-text font-bold py-2 px-4 rounded-md border-primary border-2 my-4">
        VELG DATO
      </button>
      {showCalendar && <VelgDatoBoks />}
      {dataFetched ? (
        <div>
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
                  backgroundColor: "#1C1B29",
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
          <div className="bg-primary rounded-lg shadow-md shadow-accent text-text p-2 mt-4">
            <h2 className="text-xl font-bold italic m-2">
              Kommentar for dagen
            </h2>
            <div className="text-text bg-bg/50 rounded-lg p-2">
              {dataSchema.comment}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-text text-lg">
          <p>Laster personlig data</p>
          <ReactLoading type={"bars"} color={"#1C1B29"} width={200} />
        </div>
      )}
    </div>
  );
};

export default PersonalStats;
