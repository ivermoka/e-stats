import { BarChart } from "./barChart";
import React, { useState, useEffect } from "react";

const PersonalStats = () => {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setDate(new Date().toLocaleDateString());
      setUser(localStorage.getItem("username"));
    }
    fetchSessionData();
  }, []);

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
      const res = await fetch("/api/fetchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
        }),
      });
      if (res.status === 200) {
        setSessionData(await res.json());
        console.log(sessionData);
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
      <button className="text-text font-bold py-2 px-4 rounded-md border-primary border-2 my-4">
        VELG DATO
      </button>
      {dataFetched ? (
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
                  sessionData.disclosure1,
                  sessionData.disclosure2,
                  sessionData.disclosure3,
                  sessionData.disclosure4,
                  sessionData.disclosure5,
                  sessionData.disclosure6,
                ],
              },
            ],
          }}
          options={options}
        />
      ) : (
        <p>Loading data..</p>
      )}
    </div>
  );
};

export default PersonalStats;
