import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { BarChart } from "@/components/stats/barChart";
import { GetUser } from "@/actions/getUser";

import { BsCalendar } from "react-icons/bs";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
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
        console.log(data.ratings);
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

  const labels = [1, 2, 3, 4, 5, 6, 7];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Din vurdering",
        data: [5, 6, 7, 8, 9, 10, 7],
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

      <h1>
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
            <div
              key={index}
              onClick={() => setTeam(team.teamName)}
              className="team-item"
            >
              {team.teamName}
            </div>
          ))}
        </div>
      )}

      {/*Stats container*/}

      <div className="h-80">
        <BarChart data={data} options={options} />
      </div>

      {/*Piler for neste eller forrige stats som skal vises*/}

      <div className="flex justify-around text-4xl">
        <button type="button">
          <BiLeftArrow />
        </button>
        <button type="button">
          <BiRightArrow />
        </button>
      </div>

      {/*Container for kommentarer*/}
      {stats.map((rating, i) => (
        <div
          key={i}
          className="dark:bg-primary bg-primaryLight rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight p-2 mt-4"
        >
          <h2 className="text-xl font-bold italic m-2">{rating.user} </h2>
          <div className="dark:bg-bg/50 bg-bgLight/50 rounded-lg p-2">
            {rating.comment}
          </div>
          {showReply && (
            <>
              <input className="dark:bg-secondary" type="text" />
              <button type="submit">Send</button>
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
