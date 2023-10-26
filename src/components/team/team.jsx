import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";

const Team = ({ text, onClick }) => {
  return (
    <>
      <div
        className={
          " dark:bg-bg  border-b-2- dark:border-bg  border p-4 rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight text-2xl w-full flex justify-start self-ml-10 items-center "
        }
      >
        <Link href={`/teams/${text}`}>{text}</Link>
        <AiOutlineUserAdd className="ml-auto w-8 h-8" onClick={onClick} />
      </div>
      <div className="w-full h-[1px] dark:bg-white bg-black"></div>
    </>
  );
};

export default Team;
