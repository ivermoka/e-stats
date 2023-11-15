import Link from "next/link";

const Members = ({ text }) => {
  return (
    <Link href={`/users/${text}`}>
      <div
        className={
          "dark:bg-primary bg-primaryLight p-4 rounded-md dark:text-text text-textLight font-semibold text-2xl w-full break-all"
        }
      >
        {text}
      </div>
    </Link>
  );
};

export default Members;
