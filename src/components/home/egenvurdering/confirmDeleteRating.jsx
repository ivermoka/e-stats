import { useState } from "react";

const ConfirmDelete = ({ setShowConfirmDelete, deleteRating }) => {
  const [confirm, setConfirm] = useState("");

  return (
    <div
      className={
        "fixed top-0 left-0 h-screen w-screen bg-bg/70 backdrop-blur-md p-8 flex flex-col text-center gap-4 justify-center items-center text-2xl dark:text-text text-textLight font-semibold"
      }
    >
      <div
        className={
          "rounded-lg dark:bg-primary bg-primaryLight shadow-md dark:shadow-accent shadow-accentLight p-4 flex flex-col gap-2"
        }
      >
        <h1>Skriv SLETT for å konfirmere</h1>
        <h2 className={"text-lg italic"}>
          Egenvurderingen vil ikke telles i statistikk og du vil kunne sende en
          ny en.
        </h2>
        <input
          className={
            "text-bg p-2 rounded-lg shadow-md dark:shadow-accent shadow-accentLight"
          }
          type="text"
          onChange={(e) => setConfirm(e.target.value)}
        />
        {confirm.toLowerCase() === "slett" ? (
          <button
            onClick={() => deleteRating()}
            type="button"
            className={
              "rounded-lg shadow-md dark:shadow-accent shadow-accentLight bg-bg px-4 py-2 text-red-400 m-4"
            }
          >
            Slett egenvurdering
          </button>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => setShowConfirmDelete(false)}
        className={
          "rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:bg-primary bg-primaryLight px-4 py-2"
        }
      >
        Lukk
      </button>
    </div>
  );
};

export default ConfirmDelete;
