import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "@/components/navbar/dropdown/dropdown";
import Terms from "@/components/navbar/terms/terms";
import ConfirmDelete from "@/components/navbar/dropdown/confirmDelete";
import { GetUser } from "@/actions/getUser";
import { RxHamburgerMenu } from "react-icons/rx";

const Top = ({ user }) => {
  const [dropdown, setDropdown] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (dropdown || showConfirmDelete || showTerms) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [dropdown, showTerms]);

  return (
    <>
      <div
        className={
          "h-16 top-0 w-screen fixed dark:border-primary border-primaryLight border-b-2 flex justify-between items-center px-2 dark:bg-bg bg-bgLight z-20"
        }
      >
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt={"logo"}
            width={45}
            height={45}
            priority
          />
        </Link>
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
            <RxHamburgerMenu className=" dark:text-white text-black text-4xl ml-4" />
          </button>
        ) : (
          <div className="h-16 p-2 flex gap-4 justify-center items-center dark:text-text text-textLight font-thin text-md">
            <Link href="/register">Registrer </Link>
            <span>/</span>
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
