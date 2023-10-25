import { useState } from "react";
import CreateTeam from "@/components/team/createTeam";
import Searchbar from "./../../components/team/searchBar";
import { AiOutlineRollback } from "react-icons/ai";

const AdjustTeam = ({ user, setShowTeam, data }) => {
  const [showCreateTeam, setShowCreateTeam] = useState(false);

  const leaveTeam = async () => {
    console.log(user);
    try {
      const res = await fetch("/api/teamPage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });
      if (res.status === 200) {
        console.log("Team left");
        window.location.reload();
      } else if (res.status === 400) {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const boxStyle =
    "dark:bg-primary bg-primaryLight rounded-lg shadow-lg dark:shadow-accent shadow-accentLight p-4 text-2xl font-semibold";
  return (
    <div className="fixed top-16 left-0 h-screen w-screen dark:bg-bg/70 bg-bgLight/70 backdrop-blur-md p-8 flex flex-col gap-6 items-center">
      {data.team !== "Ikke valgt" ? (
        <h1 className="font-bold text-xl italic mt-16">
          Du er medlem av laget: {data.team}
        </h1>
      ) : (
        <h1 className="font-bold text-xl italic mt-16">
          Du er ikke medlem av noe lag
        </h1>
      )}
      <button
        type="button"
        className="rounded-lg p-2 my-4 w-10 text-center dark:bg-primary bg-primaryLight shadow-md dark:shadow-accent shadow-accentLight fixed right-8 top-4"
        onClick={() => {
          setShowTeam(false);
        }}
      >
        <AiOutlineRollback className="w-full h-full dark:text-text text-textLight font-bold" />
      </button>
      {showCreateTeam && <CreateTeam setShowCreateTeam={setShowCreateTeam} />}
      <Searchbar />
      <button
        type="button"
        onClick={() => setShowCreateTeam(true)}
        className={`${boxStyle} w-1/2`}
      >
        Opprett
      </button>
      {data.team !== "Ikke valgt" && (
        <button
          type="button"
          className={`${boxStyle} text-red-400 font-semibold text-2xl`}
          onClick={() => leaveTeam()}
        >
          Forlat {data.team}?
        </button>
      )}
    </div>
  );
};

export default AdjustTeam;
