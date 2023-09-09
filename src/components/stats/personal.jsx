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
  }, []);

  useEffect(() => {
    if (user !== null) {
      getData();
    }
  }, [user, date]);

  const getData = async () => {
    try {
      const response = await fetch(
        `api/getPersonalData/?user=${user}&date=${date}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setSessionData(data.session);
        setDataFetched(true);
      } else {
        console.log("Error after fetch:", response);
      }
    } catch (error) {
      console.log(error);
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
                  sessionData.food,
                  sessionData.sleep,
                  sessionData.motivation,
                  sessionData.physical,
                  sessionData.psychological,
                  sessionData.played,
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
