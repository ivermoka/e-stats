import { useState } from "react";
import CreateTeam from "@/components/team/createTeam";
import JoinTeamPopup from "@/components/team/joinTeamPopup";
import Searchbar from "@/components/team/searchbar";

const AdjustTeam = ({ user }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);

  const [showCode, setShowCode] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const joinTeam = async () => {
    console.log(selectedTeam);
    try {
      const res = await fetch("/api/teamPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedTeam, user, teamCode }),
      });
      if (res.status === 200) {
        window.location.reload();
        window.location.href = `/teams/${selectedTeam}`;
      } else if (res.status === 400) {
        console.log("feil kode");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    <div className="fixed top-16 left-0 h-screen w-screen dark:bg-bg/70 bg-bgLight/70 backdrop-blur-md p-8 flex flex-col items-center">
      {showCreateTeam && <CreateTeam setShowCreateTeam={setShowCreateTeam} />}
      {showCode && (
        <JoinTeamPopup
          joinTeam={joinTeam}
          setTeamCode={setTeamCode}
          setShowCode={setShowCode}
        />
      )}
      {showSearch && (
        <Searchbar
          joinTeam={joinTeam}
          setTeamCode={setTeamCode}
          setSelectedTeam={setSelectedTeam}
          showCode={showCode}
          setShowCode={setShowCode}
        />
      )}
      <button
        type="button"
        onClick={() => setShowSearch(!showSearch)}
        className={`${boxStyle} w-1/2`}
      >
        Finn
      </button>
      <button
        type="button"
        onClick={() => setShowCreateTeam(true)}
        className={`${boxStyle} w-1/2`}
      >
        Opprett
      </button>
      <button
        type="button"
        className={`${boxStyle} text-red-400 font-semibold text-2xl`}
        onClick={() => leaveTeam()}
      >
        Forlat lag
      </button>
    </div>
  );
};

export default AdjustTeam;
