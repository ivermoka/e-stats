import { GetUser } from "@/actions/getUser";
import { useState, useEffect } from "react";

const EndreProfil = ({ setModalOpen, setId }) => {
  const user = GetUser();
  const [error, setError] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");

  useEffect(() => {
    setNewUsername(user);
  }, [user]);

  const changeUsername = async () => {
    try {
      if (newUsername.length < 3) {
        setError("Brukernavn må være minst 3 bokstaver");
        return;
      }
      const res = await fetch("/api/changeUsername", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUsername: newUsername,
          user: user,
          password: password,
          school: school,
        }),
      });

      if (res.status === 200) {
        setId(newUsername);
        localStorage.removeItem("token");
        window.location.href = "/login";
        setModalOpen(false);
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const boxStyle =
    "dark:bg-primary bg-primaryLight p-4 rounded-lg shadow-md dark:shadow-accent shadow-accentLight";

  const inputStyle =
    "border-2 dark:border-primary border-primaryLight rounded-lg p-1 box-border text-black";

  return (
    <div className="fixed inset-0 h-screen p-8 flex flex-col gap-2 dark:text-text text-textLight dark:bg-bg bg-bgLight z-50 mt-14">
      <div className={`font-bold text-xl italic ${boxStyle}`}>
        Endre Personlig Informasjon
      </div>
      <div>
        <ul className="p-4 text-xl font-semibold flex flex-col gap-4">
          <li className={`flex flex-col ${boxStyle}`}>
            <span>Brukernavn:</span>{" "}
            <input
              defaultValue={user}
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
              <option value="" />
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
            type="button"
            className={`${boxStyle}`}
            onClick={() => {
              changeUsername();
            }}
          >
            LAGRE
          </button>
          <button
            type="button"
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
