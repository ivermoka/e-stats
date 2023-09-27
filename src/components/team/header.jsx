import Image from "next/image";

const Header = ({ teamId }) => {
  const boxStyle = "bg-primary p-2 rounded-lg shadow-md shadow-accent";
  return (
    <div className={"flex flex-col gap-4 items-center w-full text-text"}>
      <div className={`${boxStyle} h-40 aspect-square p-2`}>
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
