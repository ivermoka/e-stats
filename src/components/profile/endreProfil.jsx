import Button from "./button";
import { useEffect, useState } from "react";

const EndreProfil = ({ setModalOpen, id, setId }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState(id);
  const [password, setPassword] = useState("");
  const [game, setGame] = useState(""); //kan etterpå sette default til det som er i databasen
  const [team, setTeam] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("username"));
  }, []);

  const changeUsername = async () => {
    try {
      const res = await fetch("/api/changeUsername", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUsername: newUsername,
          user: user,
          password: password,
          game: game,
          team: team,
        }),
      });

      if (res.status === 200) {
        localStorage.setItem("username", newUsername);
        setId(newUsername);
        window.location.href = "/users/" + newUsername;
        setModalOpen(false);
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const boxStyle = "bg-primary p-4 rounded-lg shadow-md shadow-accent";

  const inputStyle =
    "border-2 border-primary rounded-lg p-1 box-border text-black";

  return (
    <div className="fixed top-0 left-0 h-screen w-screen p-8 flex flex-col gap-2 text-text bg-bg z-50">
      <div className={`font-bold text-xl italic ${boxStyle}`}>
        Endre Personlig Informasjon
      </div>
      <div>
        <ul className="p-4 text-xl font-semibold flex flex-col gap-4">
          <li className={`flex flex-col ${boxStyle}`}>
            <span>Brukernavn:</span>{" "}
            <input
              defaultValue={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
              }}
              className={inputStyle}
            />{" "}
          </li>
          <li className={`flex flex-col ${boxStyle}`}>
            <span>Spill:</span>{" "}
            <select
              name="game"
              defaultValue={game}
              onChange={(e) => {
                setGame(e.target.value);
              }}
              className={inputStyle}
            >
              <option value=""></option>
              <option value="CS:GO">CS:GO</option>
              <option value="League of Legends">League of Legends</option>
              <option value="Dota 2">Dota 2</option>
              <option value="Valorant">Valorant</option>
              <option value="Overwatch">Overwatch</option>
            </select>
          </li>
          <li className={`flex flex-col ${boxStyle}`}>
            <span>Lag:</span>{" "}
            <select
              name="team"
              defaultValue={team}
              onChange={(e) => {
                setTeam(e.target.value);
              }}
              className={inputStyle}
            >
              <option value=""></option>
              <option value="Team1">Team 1</option>
              <option value="Team2">Team 2</option>
              <option value="Team3">Team 3</option>
              <option value="Team4">Team 4</option>
              <option value="Team5">Team 5</option>
            </select>
          </li>
          <li className={`flex flex-col ${boxStyle}`}>
            <span>Passord:</span>{" "}
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className={inputStyle}
            />
          </li>
          <button
            className={`${boxStyle}`}
            onClick={() => {
              changeUsername();
            }}
          >
            LAGRE
          </button>
          <button
            className={`${boxStyle}`}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            AVBRYT
          </button>
          <span className="text-center italic text-red-600">{error}</span>
        </ul>
      </div>
    </div>
  );
};

export default EndreProfil;
