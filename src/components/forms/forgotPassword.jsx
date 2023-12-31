import React, { useState } from "react";

const ForgotPassword = ({ setShow }) => {
  const [user, setUser] = useState("");
  const finnBruker = async (e) => {
    e.preventDefault();
    try {
      const res = fetch(`/api/forgotPassword?user=${user}`, {
        method: "GET",
      });
      if (res.status === 200) {
        console.log(await res.json());
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={
        "z-50 fixed dark:bg-bg/70 bg-bgLight/70 backdrop-blur-md h-screen w-screen flex flex-col justify-center gap-8 p-8 dark:text-text text-textLight"
      }
    >
      <h1 className="text-4xl">Glemt Passord</h1>
      <form onSubmit={(e) => finnBruker(e)} className={"flex flex-col gap-2"}>
        <label className={"w-1/2 text-2xl"}>Brukernavn</label>
        <input
          onChange={(e) => setUser(e.target.value)}
          className={"w-1/2 h-8 rounded-lg p-2 text-bg"}
          type={"text"}
        />
        <button
          type="submit"
          className={
            "text-2xl font-semibold rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:bg-primary bg-primaryLight py-2 w-1/2"
          }
        >
          Finn Bruker
        </button>
      </form>

      <button
        onClick={() => setShow(false)}
        className={
          "text-2xl font-semibold rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:bg-primary bg-primaryLight py-2 w-1/2"
        }
      >
        Lukk
      </button>
    </div>
  );
};

export default ForgotPassword;
