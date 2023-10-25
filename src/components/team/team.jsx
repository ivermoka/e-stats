import Link from "next/link";
import SeperationLine from "../navbar/dropdown/sepLine";

const Team = ({ text }) => {
  return (
    <Link
      className="px-1 rounded-lg dark:text-text text-textLight text-2xl w-full flex flex-col my-2"
      href={`/teams/${text}`}
    >
      {text}
      <SeperationLine />
    </Link>
  );
};

export default Team;
