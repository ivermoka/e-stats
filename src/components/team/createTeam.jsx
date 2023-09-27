import React, { useState } from "react";

const CreateTeam = ({ setShowCreateTeam }) => {
  const [teamName, setTeamName] = useState("");
  const makeTeam = async (e) => {
    e.preventDefault();
    console.log(teamName);
    try {
      const res = await fetch(`/api/registerTeam`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamName: teamName }),
      });
      if (res.status === 200) {
        console.log("Team created");
      } else if (res.status === 500) {
        console.log("Error fetching data");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div
        className={
          "absolute top-0 left-0 w-1/2 h-1/2 bg-black bg-opacity-50 flex justify-center items-center"
        }
      >
        <form>
          <input
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Nytt lag"
          />
          <button
            type="submit"
            onClick={(e) => {
              makeTeam(e).then();
            }}
          >
            Opprett
          </button>
          <button onClick={() => setShowCreateTeam(false)}>LUKK</button>
        </form>
      </div>
    </>
  );
};

export default CreateTeam;
