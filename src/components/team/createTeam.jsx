import React, { useState } from "react";
import { GetUser } from "@/actions/getUser";

const CreateTeam = ({ setShowCreateTeam }) => {
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const user = GetUser();

  const makeTeam = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/registerTeam", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamName: teamName,
          username: user,
          teamCode: teamCode,
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
  };
  return (
    <div
      className={
        "fixed h-screen w-screen bg-black/50 z-50 left-0 top-0 grid place-items-center"
      }
    >
      <form
        className={
          "w-72 h-96 dark:bg-primary bg-primaryLight dark:text-text text-textLight flex flex-col gap-4 justify-center items-center rounded-lg shadow-md dark:shadow-accent shadow-accentLight"
        }
      >
        <h1 className={"text-3xl"}>Opprett Lag</h1>
        <input
          className={"p-2 rounded-lg"}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Nytt lag"
        />
        <input
          className={"p-2 rounded-lg"}
          onChange={(e) => setTeamCode(e.target.value)}
          placeholder="Din lag kode"
        />
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
