import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "@/components/navbar/dropdown/dropdown";
import Terms from "@/components/navbar/terms/terms";
import ConfirmDelete from "@/components/navbar/dropdown/confirmDelete";
import { GetUser } from "@/actions/getUser";
import { RxHamburgerMenu } from "react-icons/rx";

const Top = () => {
  const user = GetUser();
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
          "h-16 top-0 w-screen fixed dark:border-primary border-primaryLight border-b-2 flex items-center px-2 dark:bg-bg bg-bgLight z-20"
        }
      >
        <div className={"w-3"} />
        <Link href={"/"} className={"w-14"}>
          <Image
            src={"/logo.png"}
            alt={"logo"}
            width={60}
            height={60}
            priority
          />
        </Link>
        <div className="w-full"></div>
        {user ? (
          <button
            type="button"
            onClick={() => {
              setDropdown(!dropdown);
            }}
            className={
              "w-14 rounded-full dark:border-primary  grid place-items-center"
            }
          >
            {/*navbar ikonet, hamburgermenu, react icons*/}
            <RxHamburgerMenu className=" dark:text-white text-black h-9 w-9" />
            <div className="w-2"></div>
          </button>
        ) : (
          <div className="h-16 w-20 p-2 flex flex-col gap-2 justify-center items-center dark:text-text text-textLight font-thin text-md">
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
