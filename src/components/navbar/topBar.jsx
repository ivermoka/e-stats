import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { useEffect, useState } from "react";

const Top = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);

  return (
    <div
      className={
        "h-20 top-0 w-screen fixed border-primary border-b-2 flex justify-between items-center px-2 bg-bg"
      }
    >
      <div className={"w-24"}></div>
      <Link href={"/"} className={"w-14"}>
        <Image src={"/logo.png"} alt={"logo"} width={60} height={60} priority />
      </Link>
      <Link
        href={`/users/${user}`}
        className={
          "w-14 rounded-full border-primary border-4 grid place-items-center"
        }
      >
        <Image
          src={"/logo.png"}
          alt={"profile picture"}
          width={100}
          height={100}
          priority
        />
      </Link>
    </div>
  );
};

export default Top;
