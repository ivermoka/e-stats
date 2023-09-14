import Link from "next/link";
import { useState, useEffect } from "react";

const AboutYou = () => {
  const [skole, setSkole] = useState("");
  const [game, setGame] = useState("");
  const [team, setTeam] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("username"));
  }, []);

  const gameSelect = async () => {
    try {
      const res = await fetch("/api/selectInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game: game, team: team, user: user }),
      });
      if (res.status === 200) {
        console.log("Game selected.");
      } else {
        const data = await res.json();
        console.log("Error", data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-bg h-screen w-screen flex justify-center items-center flex-col gap-4 fixed top-0 left-0 z-50 text-text">
      <h2 className="font-bold text-2xl italic ">Fortell oss litt om deg...</h2>
      <span className="font-light text-sm">
        (Du kan endre på dette når som helst!)
      </span>
      <form className="bg-primary h-3/5 w-80 rounded-lg shadow-md shadow-accent flex flex-col gap-6 p-4 px-6 box-border font-semibold text-xl">
        <div className="flex flex-col gap-2 bg-bg p-4 rounded-lg">
          Skole:
          <select
            className="rounded-lg shadow-md shadow-accent bg-primary p-2"
            name="team"
            defaultValue={skole}
            onChange={(e) => {
              setTeam(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="Team1">Elvebakken</option>
            <option value="Team2">Persbråten</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 bg-bg p-4 rounded-lg">
          Spill:
          <select
            className="rounded-lg shadow-md shadow-accent bg-primary p-2"
            name="team"
            defaultValue={skole}
            onChange={(e) => {
              setTeam(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="Team1">CS:GO</option>
            <option value="Team2">Dota 2</option>
            <option value="Team2">VALORANT</option>
            <option value="Team2">League of Legends</option>
          </select>
        </div>
        <Link href="/">
          <button
            type="submit"
            onClick={gameSelect}
            className="bg-secondary rounded-lg shadow-md shadow-accent w-full font-bold italic p-2"
          >
            REGISTRER
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AboutYou;
