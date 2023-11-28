import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";

const Team = ({ text, onClick }) => {
  return (
    <>
      <div
        className={
          "dark:bg-bg dark:border-bg border p-3 rounded-lg shadow-md dark:shadow-sm dark:shadow-white/30 shadow-accentLight dark:text-text text-textLight text-xl w-full flex justify-start self-ml-10 items-center "
        }
      >
        <Link href={`/teams/${text}`}>{text}</Link>
        <AiOutlineUserAdd className="ml-auto text-3xl" onClick={onClick} />
      </div>
    </>
  );
};

export default Team;
