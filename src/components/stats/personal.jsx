import { data } from "autoprefixer";
import { BarChart } from "./barChart";
import React, { useState, useEffect } from "react";
import VelgDatoBoks from "@/pages/stats/statscalendartest";

const PersonalStats = () => {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [dataSchema, setDataSchema] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setDate(new Date().toLocaleDateString());
      setUser(localStorage.getItem("username"));
    }
  }, []);

  useEffect(() => {
    if (user && dataFetched === false) {
      fetchSessionData();
      console.log("User", user);
    } else {
      console.log("No user");
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
      const res = await fetch(`/api/fetchUser?user=${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setDataSchema(data.userSchema);
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
        <span className="text-primary">
          {user}, {date}
        </span>
      </h1>
      {/*}Knapp for å velge dato under denne linjen*/}
      <button onClick={() => {setShowCalendar(!showCalendar)}} className="text-text font-bold py-2 px-4 rounded-md border-primary border-2 my-4">
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
                  label: "Rating 1-10",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
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
          <p className="text-text">{dataSchema.comment}</p>
        </div>
      ) : (
        <p className="text-text">Loading data..</p>
      )}
    </div>
  );
};

export default PersonalStats;
