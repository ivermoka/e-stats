import Image from "next/image";

const Header = ({ teamId }) => {
  const boxStyle = "bg-primary p-2 rounded-lg shadow-md shadow-accent";
  return (
    <div className={"flex flex-col gap-4 w-full text-text items-center"}>
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
