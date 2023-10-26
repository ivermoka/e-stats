import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { GetUser } from "@/actions/getUser";

import { BsCalendar } from "react-icons/bs";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";

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

  useEffect(() => {
    getStats();
  }, [date]);

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
        setStats(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const boxStyle =
    "dark:text-text text-textLight font-bold py-2 px-4 rounded-md border-2 dark:border-primary border-secondaryLight shadow-lg dark:shadow-accent shadow-accentLight";
  return (
    <div className="h-screen mt-16 flex flex-col gap-4 p-4">
      {/*Velg dato og lag knapper */}

      <div className="flex justify-around text-lg">
        <button
          type="button"
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
          className={boxStyle}
        >
          VELG DATO
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
        <div className={`${boxStyle} flex flex-col`}>hhh1</div>
      )}

      {/*Stats container*/}

      <div className="h-80 bg-blue-400">stats</div>

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
    </div>
  );
};

export default Admin;
