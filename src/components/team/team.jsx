import Link from "next/link";
import SeperationLine from "../navbar/dropdown/sepLine";

const Team = ({ text, setSelectedTeam, setShowCode }) => {
  return (
    <>
      <div
        className={
          "dark:bg-primary bg-primaryLight p-4 rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight font-semibold text-2xl w-full flex justify-between items-center"
        }
      >
        <Link href={`${text}`}>{text}</Link>
        <button
          type="button"
          onClick={() => {
            setSelectedTeam(text);
            setShowCode(true);
          }}
        >
          Bli med
        </button>
      </div>
      <SeperationLine />
    </>
  );
};

export default Team;
