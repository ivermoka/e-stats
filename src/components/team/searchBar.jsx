import { useEffect, useState } from "react";
import Team from "@/components/team/team";
import { GoSearch } from "react-icons/go";

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
    ? allTeams
        .filter((team) =>
          team.teamName.toLowerCase().includes(search.toLowerCase()),
        )
        // sorterer alfabetisk elias skrev denne koden uten chatgpt
        .sort((a, b) => a.teamName.localeCompare(b.teamName))
    : [];

  return (
    <div className="flex flex-col w-4/5 bg-transparent gap-3">
      <section className="flex items-center w-full rounded-3xl dark:border-white border-black border-2 focus:border-2 duration-300 dark:text-text text-textLight">
        <input
          type="text"
          className="w-full h-12 p-2 bg-transparent pl-6 outline-none"
          placeholder="Søk etter lag"
          onChange={(e) => setSearch(e.target.value)}
        />
        <GoSearch className="w-8 h-8 mr-3" />
      </section>
      {/* viser bare max 5 lag om gangen for å ikke gjøre det for treigt */}
      {filteredTeams.slice(0, 5).map((team) => (
        <Team
          onClick={() => {
            setSelectedTeam(team.teamName);
            setShowCode(true);
          }}
          text={team.teamName}
          key={team.teamName}
        />
      ))}
    </div>
  );
};

export default SearchBar;
