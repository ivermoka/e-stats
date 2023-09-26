import React from "react";

const ForgotPassword = ({ setShow }) => {
  return (
    <div
      className={
        "z-50 fixed bg-bg/70 backdrop-blur-md h-screen w-screen flex flex-col justify-center gap-8 p-8 text-text"
      }
    >
      <h1 className="text-4xl">Glemt Passord</h1>
      <form
        onSubmit={() => "kjør fetch av bruker"}
        className={"flex flex-col gap-2"}
      >
        <label className={"w-1/2 text-2xl"}>Brukernavn</label>
        <input className={"w-1/2 h-8 rounded-lg p-2 text-bg"} type={"text"} />
        <button
          type={"submit"}
          className={
            "text-2xl font-semibold rounded-lg shadow-md shadow-accent bg-primary py-2 w-1/2"
          }
        >
          Finn Bruker
        </button>
      </form>

      <button
        onClick={() => setShow(false)}
        className={
          "text-2xl font-semibold rounded-lg shadow-md shadow-accent bg-primary py-2 w-1/2"
        }
      >
        Lukk
      </button>
    </div>
  );
};

export default ForgotPassword;
