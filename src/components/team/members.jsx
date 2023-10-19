import Link from "next/link";

const Members = ({ text }) => {
  return (
    <Link href={`/users/${text}`}>
      <div
        className={
          "dark:bg-primary bg-primaryLight p-4 rounded-lg  d dark:text-text text-textLight font-semibold text-2xl w-full"
        }
      >
        {text}
      </div>
    </Link>
  );
};

export default Members;
