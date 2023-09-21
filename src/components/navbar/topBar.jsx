import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "@/components/navbar/dropdown/dropdown";
import Terms from "@/components/navbar/terms/terms";
import ConfirmDelete from "@/components/navbar/dropdown/confirmDelete";

const Top = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);

  const [dropdown, setDropdown] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (dropdown || showConfirmDelete) {
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
        {user ? (
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
        ) : (
          <div className="h-16 w-20 p-2 flex flex-col gap-2 justify-center items-center text-text font-thin text-md">
            <Link href="/register">Registrer </Link>
            <Link href="/login">Logg Inn</Link>
          </div>
        )}

        {dropdown && (
          <Dropdown
            dropdown={setDropdown}
            setDropdown={setDropdown}
            user={user}
            showTerms={showTerms}
            setShowTerms={setShowTerms}
            setShowConfirmDelete={setShowConfirmDelete}
          />
        )}

        {showTerms && <Terms setShowTerms={setShowTerms} />}

        {showConfirmDelete && (
          <ConfirmDelete
            setShowConfirmDelete={setShowConfirmDelete}
            user={user}
          />
        )}
      </div>
    </>
  );
};

export default Top;
