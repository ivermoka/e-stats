import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { LineChart } from "@/components/stats/overTimeStats/lineChart";
import { GetUser } from "@/actions/getUser";

import { BsCalendar } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";

const Admin = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("no-NO"),
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTeamsDropdown, setShowTeamsDropdown] = useState(false);
  const [team, setTeam] = useState("WeWe");
  const user = GetUser();
  const [stats, setStats] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");

  useEffect(() => {
    getStats();
  }, [date, team]);

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
    console.log(reply, id, user);
    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply, id, user }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  //line chart settings
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

  // Calculate average values and sort by date
  const groupedData = {};
  stats.forEach((rating) => {
    const date = rating.date;
    if (!groupedData[date]) {
      groupedData[date] = { date, sum: 0, count: 0 };
    }
    // Assuming you want to calculate the average for disclosure1
    groupedData[date].sum += rating.disclosure1;
    groupedData[date].count += 1;
  });

  const sortedData = Object.values(groupedData)
    .map((entry) => ({
      date: entry.date,
      averageValue: entry.sum / entry.count,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Now 'sortedData' contains an array of objects with 'date' and 'averageValue' properties,
  // sorted by date based on disclosure1.

  const labels = sortedData.map((date) => date.date);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Mat",
        data: sortedData.map((rating) => rating.averageValue),
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Mat",
      },
    ],
  };

  const boxStyle =
    "dark:text-text text-textLight font-bold py-2 px-4 rounded-md border-2 dark:border-primary border-secondaryLight shadow-lg dark:shadow-accent shadow-accentLight";
  return (
    <div className="min-h-screen mt-16 flex flex-col gap-4 p-4 mb-32">
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

      {/*tekst som viser hvilket lag og hvilken dato som er valgt*/}

      <h1 className="text-textLight dark:text-text">
        Lag: {team} Dato: {currentDate}
      </h1>

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
        <div className={`${boxStyle} flex flex-col`}>
          {allTeams.map((team, index) => (
            <div key={index} onClick={() => setTeam(team.teamName)}>
              {team.teamName}
            </div>
          ))}
        </div>
      )}

      {/*Stats container*/}

      <div>
        <LineChart options={options} data={data} />
      </div>

      {/*Container for kommentarer*/}
      {stats.map((rating, i) => (
        <div
          key={i}
          className="dark:bg-primary bg-primaryLight rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 mt-4"
        >
          <h2 className="text-xl font-bold italic m-2">{rating.user} </h2>
          <div className="dark:bg-bg/50 bg-bgLight/50 rounded-lg p-2 whitespace-pre-line">
            <span dangerouslySetInnerHTML={{ __html: rating.comment }} />
          </div>
          {showReply && (
            <>
              <input type="text" onChange={(e) => setReply(e.target.value)} />
              <button type="submit" onClick={() => sendReply(rating._id)}>
                Send
              </button>
            </>
          )}
          <button
            onClick={() => setShowReply(!showReply)}
            type="button"
            className="flex justify-end w-full pr-2 pt-2 text-2xl"
          >
            <BsArrowReturnLeft />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
