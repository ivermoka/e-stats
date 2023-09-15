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
      <nav className="fixed w-full h-24 z-40 p-4 bottom-0 bg-primary/75 backdrop-blur-sm shadow-md shadow-accent rounded-t-3xl">
        <div
          className={
            "bg-accent/50 rounded-lg w-full h-full flex justify-evenly items-center shadow-md shadow-bg"
          }
        >
          <Link className={"h-full"} href="/">
            <div className={"w-16 h-full grid place-items-center"}>
              <BiHomeAlt2 className="text-4xl text-text" />
            </div>
          </Link>
          <Link className={"h-full"} href="/egenvurdering">
            <div className={"w-20 h-full grid place-items-center"}>
              <AiOutlinePlusCircle className="text-5xl text-text" />
            </div>
          </Link>
          <Link className={"h-full"} href="/stats">
            <div className={"w-16 h-full grid place-items-center"}>
              <IoIosStats className="text-4xl text-text" />
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
