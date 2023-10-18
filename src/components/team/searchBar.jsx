import { useEffect, useState } from "react";
import Team from "@/components/team/team";
import { GetUser } from "@/actions/getUser";

const SearchBar = () => {
  const [allTeams, setAllTeams] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const user = GetUser();
  useEffect(() => {
    getAllTeams().then();
  }, [search]);

  useEffect(() => {
    if (selectedTeam !== null) {
      sendJoinRequest().then();
    }
  }, [selectedTeam]);

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
  const sendJoinRequest = async () => {
    console.log(selectedTeam, user);
    console.log("Sending join request");
    try {
      const res = await fetch("/api/teamPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedTeam, user }),
      });
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
      } else if (res.status === 400) {
        console.log("Error fetching data, ", res.status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const filteredTeams = allTeams
    ? allTeams.filter((team) => team.teamName.includes(search))
    : [];

  return (
    <div className="dark:bg-primary bg-primaryLight w-full rounded-lg shadow-md dark:shadow-accent shadow-accentLight flex flex-col items-center p-2">
      <input
        type="text"
        className="w-full h-12 rounded-lg p-2 bg-secondaryLight dark:bg-secondary dark:text-text text-textLight bg-bg/75 duration-300 focus:border-2 dark:border-bg border-b-bgLight outline-none"
        placeholder="Søk etter lag"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredTeams.map((team) => (
        <Team
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
