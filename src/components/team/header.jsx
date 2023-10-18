import Image from "next/image";

const Header = ({ team }) => {
  const boxStyle =
    "dark:bg-primary bg-primaryLight p-2 rounded-lg shadow-md dark:shadow-accent shadow-accentLight";
  return (
    <div
      className={
        "flex flex-col gap-4 w-full dark:text-text text-textLight items-center"
      }
    >
      <h2 className={"text-6xl mt-8 font-bold"}>{team}</h2>
    </div>
  );
};

export default Header;
