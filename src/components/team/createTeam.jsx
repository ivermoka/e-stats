import React, { useState } from "react";
import { GetUser } from "@/actions/getUser";

const CreateTeam = ({ setShowCreateTeam }) => {
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = GetUser();

  const makeTeam = async (e) => {
    e.preventDefault();
    if (teamName.includes(" ")) {
      setErrorMessage("*Lagnavn kan bare inneholde bokstaver, tall, _ og -");
    } else {
      setErrorMessage("");
      try {
        const res = await fetch("/api/registerTeam", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamName: teamName,
            teamCode: teamCode,
            username: user,
          }),
        });
        if (res.status === 200) {
          console.log("Team created");
          window.location.href = `/teams/${teamName}`;
        } else if (res.status === 500) {
          console.log("Error fetching data");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const inputs = `bg-transparent dark:border-white border-black border dark:text-white text-black p-2 rounded-3xl outline-none text-black placeholder`;

  return (
    <div className="fixed inset-0 h-screen w-screen justify-center flex place-items-center bg-transparent/75 backdrop-blur-md ">
      <form
        className={
          "w-80 h-96 dark:bg-bg bg-primaryLight dark:text-text text-textLight flex flex-col gap-4 justify-center items-center rounded-lg shadow-md dark:shadow-accent shadow-accentLight"
        }
      >
        <h1 className={"text-3xl"}>Opprett Lag</h1>
        <input
          type="text"
          className={`${inputs}`}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Nytt lag"
        />
        <input
          type="password"
          className={`${inputs}`}
          onChange={(e) => setTeamCode(e.target.value)}
          placeholder="Din lag kode"
        />
        <span className="text-red-900 italic text-center mx-2">
          {errorMessage}
        </span>
        <button
          className={
            "p-2 rounded-lg dark:bg-accent bg-secondaryLight text-xl font-semibold"
          }
          type="submit"
          onClick={(e) => {
            makeTeam(e).then();
          }}
        >
          Opprett
        </button>
        <button
          type="button"
          className={
            "p-2 rounded-lg dark:bg-accent bg-secondaryLight text-xl font-semibold"
          }
          onClick={() => setShowCreateTeam(false)}
        >
          LUKK
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
