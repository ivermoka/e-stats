import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { LineChart } from "@/components/stats/overTimeStats/lineChart";

import { BsCalendar } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import Replyinger from "@/components/replyinger";

const Admin = ({ user }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("no-NO"),
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTeamsDropdown, setShowTeamsDropdown] = useState(false);
  const [team, setTeam] = useState("");
  const [stats, setStats] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    if (user) {
      getStats();
    }
  }, [user, date, team]);

  useEffect(() => {
    getAllTeams();
  }, []);

  const getStats = async () => {
    try {
      const res = await fetch("api/getTeamStats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, user, team }),
      });
      if (res.status === 200) {
        const data = await res.json();
        setStats(data.ratings);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllTeams = async () => {
    try {
      const res = await fetch("/api/teamPage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setAllTeams(data.teams);
      } else if (res.status === 508) {
        console.log("Error fetching data");
      }
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  const sendReply = async (id) => {
    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply, id, user }),
      });
      if (res.status === 200) {
        console.log("xp");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //line chart settings
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Gjennomsnitt statistikk for ${team}`,
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

  const getDisclosureData = (disclosure) => {
    const groupedData = {};

    stats.forEach((rating) => {
      const date = rating.date;
      const disclosureValue = rating[disclosure];

      if (!groupedData[date]) {
        groupedData[date] = { date, sum: 0, count: 0 };
      }

      groupedData[date].sum += disclosureValue;
      groupedData[date].count += 1;
    });

    const sortedData = Object.values(groupedData)
      .map((entry) => ({
        date: entry.date,
        averageValue: entry.sum / entry.count,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedData;
  };

  const labels = getDisclosureData().map((date) =>
    new Intl.DateTimeFormat("no-NO", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(new Date(date.date)),
  );

  const datasets = [
    {
      label: "Mat",
      data: getDisclosureData("disclosure1").map(
        (rating) => rating.averageValue,
      ),
      backgroundColor: "#33cc33",
      borderColor: "#33cc33",
    },
    {
      label: "Søvn",
      data: getDisclosureData("disclosure2").map(
        (rating) => rating.averageValue,
      ),
      backgroundColor: "#0066ff",
      borderColor: "#0066ff",
      hidden: true,
    },
    {
      label: "Motivasjon",
      data: getDisclosureData("disclosure3").map(
        (rating) => rating.averageValue,
      ),
      backgroundColor: "#ccff33",
      borderColor: "#ccff33",
      hidden: true,
    },
    {
      label: "Fysisk",
      data: getDisclosureData("disclosure4").map(
        (rating) => rating.averageValue,
      ),
      backgroundColor: "#EB565B",
      borderColor: "#EB565B",
      hidden: true,
    },
    {
      label: "Psykisk",
      data: getDisclosureData("disclosure5").map(
        (rating) => rating.averageValue,
      ),
      backgroundColor: "#ffff99",
      borderColor: "#ffff99",
      hidden: true,
    },
    {
      label: "Spilte",
      data: getDisclosureData("disclosure6").map(
        (rating) => rating.averageValue,
      ),
      backgroundColor: "#ff0066",
      borderColor: "#ff0066",
      hidden: true,
    },
  ];

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const boxStyle =
    "dark:text-text text-textLight font-bold py-2 px-4 rounded-md border-2 dark:border-primary border-secondaryLight shadow-lg dark:shadow-accent shadow-accentLight";
  return (
    <div className="dark:bg-bg bg-bgLight min-h-screen w-screen mt-16 flex flex-col gap-4 p-4">
      {/*Velg dato og lag knapper */}

      <div className="flex justify-around text-lg">
        <button
          type="button"
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
          className={boxStyle}
        >
          {currentDate}
          <BsCalendar className="inline ml-2 mb-[2px] w-6" />
        </button>
        <button
          type="button"
          onClick={() => {
            setShowTeamsDropdown(!showTeamsDropdown);
          }}
          className={boxStyle}
        >
          VELG LAG
          <AiOutlineTeam className="inline ml-2 mb-[2px] w-6" />
        </button>
      </div>

      {/*Vis kalender om showCalendar er true*/}

      {showCalendar && (
        <Calendar
          className={
            "dark:border-primary border-secondaryLight border-2 shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 font-semibold"
          }
          tileClassName={({ date }) => {
            const isSelectedDate =
              date.toLocaleDateString("no-NO") === currentDate;
            return isSelectedDate
              ? "selected-date-class dark:bg-[#F8D8B1] bg-[#305464] dark:text-black text-white p-2 dark: border-textLight dark:border"
              : "p-2 dark:border-text border-textLight border";
          }}
          onClickDay={(day) => {
            setDate(new Date(day).toLocaleDateString("en-US"));
            setCurrentDate(new Date(day).toLocaleDateString("no-NO"));
          }}
        />
      )}

      {/*Vis lag dropdown om showTeamsDropdown er true*/}

      {showTeamsDropdown && (
        <div className={`flex flex-col gap-2`}>
          {allTeams.map((team, index) => (
            <div
              className={boxStyle}
              key={index}
              onClick={() => setTeam(team.teamName)}
            >
              {team.teamName}
            </div>
          ))}
        </div>
      )}

      {/*Stats container*/}

      {team && (
        <div className="md:h-96 h-72">
          <LineChart options={options} data={data} />
        </div>
      )}

      {/*Container for kommentarer*/}
      <div className="mb-20 flex flex-col gap-4">
        {[...labels].reverse().map((date, i) => (
          <div className="flex flex-col" key={i}>
            <h2 className="text-xl font-bold">{date}</h2>
            <div className="h-[1px] dark:bg-text bg-textLight" />
            {stats
              .filter((rating) => {
                const ratingDate = new Intl.DateTimeFormat("no-NO", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }).format(new Date(rating.date));
                return ratingDate === date;
              })
              .map((filteredRating, j) => (
                <Replyinger
                  key={j}
                  rating={filteredRating}
                  sendReply={sendReply}
                  setReply={setReply}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
