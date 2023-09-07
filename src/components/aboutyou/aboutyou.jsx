import SelectGame from "../profile/selectGame";
import Input from "./input";
import Link from "next/link";
import { useState, useEffect } from "react";

const AboutYou = () => {
  const [game, setGame] = useState("");
  const [team, setTeam] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("username"));
  }, []);
  console.log(user);

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
    <div className="bg-bg h-screen w-screen flex justify-center items-center flex-col gap-4 fixed top-0 left-0 z-20">
      <h2 className="font-bold text-2xl italic">Fortell oss litt om deg...</h2>
      <form className="bg-primary h-3/5 w-80 rounded-lg flex flex-col items-center gap-4 p-4 box-border">
        Spill:
        <select
          name="game"
          defaultValue={game}
          onChange={(e) => {
            setGame(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="CS:GO">CS:GO</option>
          <option value="League of Legends">League of Legends</option>
          <option value="Dota 2">Dota 2</option>
          <option value="Valorant">Valorant</option>
          <option value="Overwatch">Overwatch</option>
        </select>
        Lag:
        <select
          name="team"
          defaultValue={team}
          onChange={(e) => {
            setTeam(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="Team1">Team 1</option>
          <option value="Team2">Team 2</option>
          <option value="Team3">Team 3</option>
          <option value="Team4">Team 4</option>
          <option value="Team5">Team 5</option>
        </select>
        <Link href="/">
          <button
            type="submit"
            onClick={gameSelect}
            className="bg-primary border-bg border-2 rounded-md w-72 font-bold italic"
          >
            REGISTRER
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AboutYou;
