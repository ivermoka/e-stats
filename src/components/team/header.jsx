import Image from "next/image";
import { useEffect, useState } from "react";
import Members from "@/components/team/members";

const Header = ({ teamId }) => {
  const boxStyle = "bg-primary p-2 rounded-lg shadow-md shadow-accent";
  return (
    <div className={"mt-24 flex gap-4 items-end w-full h-32 text-text"}>
      <div className={`${boxStyle} h-full aspect-square p-2`}>
        <Image
          src={"/logo.png"}
          alt={"team logo"}
          width={200}
          height={200}
          priority
        />
      </div>
      <h2 className={"text-5xl font-bold"}>wikjsfkj</h2>
    </div>
  );
};

export default Header;
