import { useState } from "react";
import Image from "next/image";
import { GetUser } from "@/actions/getUser";

const UserInfo = () => {
  const user = GetUser();
  return (
    <div className={"h-16 flex justify-center items-center"}>
      <div
        className={
          "w-14 rounded-full border-primary border-4 grid place-items-center"
        }
      >
        <Image src={"/logo.png"} alt={"profile pic"} width={50} height={50} />
      </div>
      <h2
        className={"dark:text-text text-textLight font-semibold text-xl px-2"}
      >
        {user}
      </h2>
    </div>
  );
};

export default UserInfo;
