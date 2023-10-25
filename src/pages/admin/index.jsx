import { useState } from "react";
import Calendar from "react-calendar";

import { BsCalendar } from "react-icons/bs";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";

const Admin = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const boxStyle =
    "dark:text-text text-textLight font-bold py-2 px-4 rounded-lg dark:bg-primary bg-primaryLight shadow-md dark:shadow-accent shadow-accentLight";
  return (
    <div className="h-screen mt-16 flex flex-col gap-4 p-4">
      {/*Velg dato og lag knapper */}

      <div className="flex justify-around">
        <button
          type="button"
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
          className={boxStyle}
        >
          VELG DATO
          <BsCalendar className="inline ml-2 mb-[2px]" />
        </button>
        <button type="button" className={boxStyle}>
          VELG LAG
        </button>
      </div>

      {/*Vis kalender vis showCalendar er true*/}

      {showCalendar && <Calendar className={boxStyle} />}

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

      <div className={boxStyle}>
        <h2 className="text-xl italic p-2">bruker sin kommentar</h2>
        <div className="dark:bg-bg/50 bg-bgLight/50 rounded-lg p-2 font-normal">
          kommentar
        </div>
      </div>
    </div>
  );
};

export default Admin;
