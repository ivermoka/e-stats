import { AiOutlineRollback } from "react-icons/ai";

const JoinTeamPopup = ({ setTeamCode, joinTeam, setShowCode, error }) => {
  return (
    <div className="fixed h-screen w-screen bg-black/50 z-50 left-0 top-0 grid place-items-center">
      <div className="bg-primaryLight dark:bg-secondary rounded-md w-4/5 p-4 flex flex-col items-center justify-center gap-2 dark:text-text text-textLight">
        <input
          className="rounded-md p-2 text-textLight"
          onChange={(e) => setTeamCode(e.target.value)}
          placeholder={"Kode:"}
          type="password"
        />
        <button
          className="rounded-lg bg-secondaryLight dark:bg-transparent dark:border-2 border-primary p-2 dark:text-text"
          type="button"
          onClick={() => joinTeam()}
        >
          Bli med
        </button>
        <button
          className="p-2 bg-secondaryLight dark:bg-transparent dark:border-2 border-primary dark:text-text rounded-lg"
          type="button"
          onClick={() => setShowCode(false)}
        >
          <AiOutlineRollback />
        </button>
        <span className="text-red-500 italic">{error}</span>
      </div>
    </div>
  );
};

export default JoinTeamPopup;
