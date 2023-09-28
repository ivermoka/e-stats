import { useEffect, useState } from "react";
import Image from "next/image";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);
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
