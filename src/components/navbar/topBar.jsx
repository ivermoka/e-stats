import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "@/components/navbar/dropdown/dropdown";

const Top = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);

  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (dropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [dropdown]);

  return (
    <>
      <div
        className={
          "h-20 top-0 w-screen fixed border-primary border-b-2 flex justify-between items-center px-2 bg-bg z-20"
        }
      >
        <div className={"w-20"}></div>
        <Link href={"/"} className={"w-14"}>
          <Image
            src={"/logo.png"}
            alt={"logo"}
            width={60}
            height={60}
            priority
          />
        </Link>
        <div
          onClick={() => {
            setDropdown(!dropdown);
          }}
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
        </div>

        {dropdown && (
          <Dropdown
            dropdown={setDropdown}
            setDropdown={setDropdown}
            user={user}
          />
        )}
      </div>
    </>
  );
};

export default Top;
