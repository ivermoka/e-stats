import Image from "next/image";

const Header = ({ team }) => {
  return (
    <div
      className={
        "flex flex-col gap-4 w-full dark:text-text text-textLight items-center"
      }
    >
      <h2 className={"text-6xl mt-8 font-bold break-all text-center"}>
        {team}
      </h2>
    </div>
  );
};

export default Header;
