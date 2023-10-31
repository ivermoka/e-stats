import { useState, useEffect } from "react";
import Link from "next/link";
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";

export default function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);
  return (
    <>
      <nav className="flex justify-evenly fixed w-full h-20 p-4 bottom-0 dark:bg-primary/75 bg-primaryLight/75 backdrop-blur-sm shadow-md dark:shadow-accent shadow-accentLight rounded-t-3xl">
        <Link className={"h-full"} href="/">
          <div className={"w-16 h-full grid place-items-center"}>
            <BiHomeAlt2 className="text-4xl dark:text-text text-textLight" />
          </div>
        </Link>
        <Link className={"h-full"} href="/egenvurdering">
          <div className={"w-20 h-full grid place-items-center"}>
            <AiOutlinePlusCircle className="text-5xl dark:text-text text-textLight" />
          </div>
        </Link>
        <Link className={"h-full"} href="/stats">
          <div className={"w-16 h-full grid place-items-center"}>
            <IoIosStats className="text-4xl dark:text-text text-textLight" />
          </div>
        </Link>
      </nav>
    </>
  );
}
