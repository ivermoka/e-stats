import { useEffect, useState } from "react";
import Members from "@/components/team/members";

const SearchBar = () => {
  const [allTeams, setAllTeams] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getAllTeams().then();
  }, []);

  const getAllTeams = async () => {
    try {
      const res = await fetch(`/api/getAllTeams`, {
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
      console.log(err);
    }
  };
  const filteredTeams = allTeams
    ? allTeams.filter((team) => team.teamName.includes(search))
    : [];

  return (
    <div className="mt-24 bg-primary h-screen w-full rounded-lg shadow-md shadow-accent grid place-items-center p-2">
      <input
        type="text"
        className="w-full h-full rounded-lg p-2 text-text bg-bg/75 duration-300 focus:bg-red-400"
        placeholder="Søk etter lag"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredTeams.map((team) => (
        <Members text={team.teamName} key={team.teamName}>
          {" "}
        </Members>
      ))}
    </div>
  );
};

export default SearchBar;
