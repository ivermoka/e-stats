import { useEffect, useState } from "react";
import Team from "@/components/team/team";

const SearchBar = ({ setSelectedTeam, setShowCode }) => {
  const [allTeams, setAllTeams] = useState(null);
  const [search, setSearch] = useState("");

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
  const filteredTeams = allTeams
    ? allTeams.filter((team) =>
        team.teamName.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <div className="dark:bg-primary bg-primaryLight w-full rounded-lg shadow-md dark:shadow-accent shadow-accentLight flex flex-col items-center p-2">
      <input
        type="text"
        className="w-full h-12 rounded-md p-2 bg-secondaryLight dark:bg-secondary dark:text-text text-textLight bg-bg/75 duration-300 focus:border-2 dark:border-bg border-b-bgLight outline-none"
        placeholder="Søk etter lag"
        onChange={(e) => setSearch(e.target.value)}
      />
      {search === "" ? null : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SearchBar;
