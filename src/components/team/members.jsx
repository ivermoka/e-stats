import Link from "next/link";

const Members = ({ text }) => {
  return (
    <Link href={`/users/${text}`}>
      <div
        className={
          "dark:bg-primary bg-gray-400  p-4 rounded-lg shadow-lg dark:shadow-slate-400 shadow-slate-800 dark:text-text text-textLight font-semibold text-2xl w-4/5 my-3 border border-black"
        }
      >
        {text}
      </div>
    </Link>
  );
};

export default Members;
