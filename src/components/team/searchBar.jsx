import { useEffect, useState } from "react";
import Team from "@/components/team/team";
import { GetUser } from "@/actions/getUser";

const SearchBar = () => {
  const [showCode, setShowCode] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const [allTeams, setAllTeams] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const user = GetUser();
  useEffect(() => {
    getAllTeams().then();
  }, [search]);

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
  const joinTeam = async () => {
    try {
      const res = await fetch("/api/teamPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedTeam, user, teamCode }),
      });
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        window.location.reload();
        window.location.href = `/teams/${selectedTeam}`;
      } else if (res.status === 400) {
        console.log("feil kode");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const filteredTeams = allTeams
    ? allTeams.filter((team) => team.teamName.includes(search))
    : [];

  return (
    <div className="dark:bg-primary bg-primaryLight w-full rounded-lg shadow-md dark:shadow-accent shadow-accentLight flex flex-col items-center p-2 ">
      {showCode && (
        <div>
          <input
            onChange={(e) => setTeamCode(e.target.value)}
            placeholder={"Team code: "}
          ></input>
          <button onClick={() => joinTeam()}>join</button>
        </div>
      )}
      <input
        type="text"
        className="w-full h-12 rounded-3xl p-2 bg-secondaryLight dark:bg-secondary dark:text-text text-textLight bg-bg/75 duration-300 focus:border-2 dark:border-bg border-b-bgLight outline-none"
        placeholder="Søk etter lag"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredTeams.slice(0, 5).map((team) => (
        <Team
          setShowCode={setShowCode}
          setSelectedTeam={setSelectedTeam}
          text={team.teamName}
          key={team.teamName}
        >
          {" "}
        </Team>
      ))}
    </div>
  );
};

export default SearchBar;
