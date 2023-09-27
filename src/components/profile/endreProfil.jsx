import Button from "./button";
import { useEffect, useState } from "react";

const EndreProfil = ({ setModalOpen, id, setId }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [school, setSchool] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
      setNewUsername(id);
    }
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
          team: team,
          school: school,
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
            <span>Skole:</span>{" "}
            <select
              name="skole"
              defaultValue={"xpp"}
              onChange={(e) => {
                setSchool(e.target.value);
              }}
              className={inputStyle}
            >
              <option value=""></option>
              <option value="Elvebakken">Elvebakken</option>
              <option value="Persbråten">Persbråten</option>
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
