import Button from "./button";
import SelectGame from "./selectGame";
import { useEffect, useState } from "react";

const EndreProfil = ({ setModalOpen, id, setId }) => {
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState(id);

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
        body: JSON.stringify({ newUsername: newUsername, user: user }),
      });

      if (res.status === 200) {
        localStorage.setItem("username", newUsername);
        setId(newUsername);
        window.location.href = "/users/" + newUsername;
      } else {
        const data = await res.json();
        console.log("Error", data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const inputStyle =
    "border-2 border-primary rounded-lg p-1 box-border text-black";

  return (
    <div className="fixed top-0 left-0 h-screen w-screen p-8 flex flex-col gap-8 text-text bg-bg">
      <h2 className="font-bold text-xl italic">Endre Personlig Informasjon</h2>
      <div className="border-2 border-primary rounded-lg">
        <div className="bg-primary box-border p-4 text-3xl font-bold">{id}</div>
        <ul className="p-4 text-xl font-semibold flex flex-col gap-4">
          <li className="flex flex-col">
            <span>Brukernavn:</span>{" "}
            <input
              defaultValue={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
              }}
              className={inputStyle}
            />{" "}
          </li>
          <li className="flex flex-col">
            <span>Spill:</span> <SelectGame className={inputStyle} />
          </li>
          <li className="flex flex-col">
            <span>Lag:</span> <input className={inputStyle} />{" "}
          </li>
          <li className="flex flex-col">
            <span>Passord:</span> <input className={inputStyle} />{" "}
          </li>
          <Button
            onClick={() => {
              setModalOpen(false);
              changeUsername();
            }}
            text="LAGRE"
          />
        </ul>
      </div>
    </div>
  );
};

export default EndreProfil;
