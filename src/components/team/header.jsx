import Image from "next/image";

const Header = ({ teamId }) => {
  const boxStyle =
    "dark:bg-primary bg-primaryLight p-2 rounded-lg shadow-md dark:shadow-accent shadow-accentLight";
  return (
    <div
      className={
        "flex flex-col gap-4 w-full dark:text-text text-textLight items-center"
      }
    >
      <div
        className={`${boxStyle} h-full w-1/2 aspect-square p-2 grid place-items-center`}
      >
        <Image
          src={"/logo.png"}
          alt={"team logo"}
          width={200}
          height={200}
          priority
        />
      </div>
      <h2 className={"text-5xl font-bold"}>{teamId}</h2>
    </div>
  );
};

export default Header;
