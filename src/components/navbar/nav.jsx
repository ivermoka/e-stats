import Link from "next/link";
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-evenly fixed w-full h-20 p-4 bottom-0 rounded-t-2xl border-primaryLight dark:border-primary bg-bgLight dark:bg-bg border-t-2">
        <Link className={"h-full"} href="/">
          <div className={"w-16 h-full grid place-items-center"}>
            <BiHomeAlt2 className="text-4xl dark:text-text text-textLight" />
          </div>
        </Link>
        <Link className={"h-full"} href={"/egenvurdering"}>
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
