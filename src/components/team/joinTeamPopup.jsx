import { AiOutlineRollback } from "react-icons/ai";

const JoinTeamPopup = ({ setTeamCode, joinTeam, setShowCode }) => {
  return (
    <div className="fixed h-screen w-screen bg-black/50 z-50 left-0 top-0 grid place-items-center">
      <div className="bg-primaryLight rounded-lg w-4/5 h-44 flex flex-col items-center justify-center gap-2">
        <input
          className="rounded-md p-2"
          onChange={(e) => setTeamCode(e.target.value)}
          placeholder={"Kode:"}
          type="password"
        />
        <button
          className="rounded-lg bg-secondaryLight dark:bg-secondary p-2"
          type="button"
          onClick={() => joinTeam()}
        >
          Bli med
        </button>
        <button
          className="p-2 bg-secondaryLight rounded-lg"
          type="button"
          onClick={() => setShowCode(false)}
        >
          <AiOutlineRollback />
        </button>
      </div>
    </div>
  );
};

export default JoinTeamPopup;
