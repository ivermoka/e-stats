import { useState } from "react";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import UserInfo from "./userInfo";
import Links from "./dropdownLink";
import Line from "./sepLine";
import Link from "next/link";
import ThemeToggle from "@/components/navbar/dropdown/themeToggle";

import { BiUser } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { MdOutlineDeleteForever } from "react-icons/md";

const Dropdown = ({
  dropdown,
  setDropdown,
  user,
  showTerms,
  setShowTerms,
  setShowConfirmDelete,
}) => {
  const [team, setTeam] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
      className={
        "h-screen w-screen fixed top-0 left-0 dark:bg-bg/70 bg-bgLight/70 backdrop-blur-md z-50"
      }
    >
      <div
        className={
          "h-20 w-screen px-2 dark:border-primary border-primaryLight border-b-2 flex justify-between items-center"
        }
      >
        <div
          onClick={() => {
            setDropdown(!dropdown);
          }}
          className={
            "w-14 rounded-full dark:border-primary border-primaryLight border-4 grid place-items-center"
          }
        >
          <FiX className={"dark:text-primary text-primaryLight text-5xl"} />
        </div>
        <ThemeToggle />
      </div>
      <UserInfo />
      <div className={"flex flex-col w-full px-4 gap-3 mt-2"}>
        <Link href={`/users/${user}`}>
          <Links
            text={"Din Profil"}
            icon={<BiUser />}
            onClick={() => setDropdown(false)}
          />
        </Link>
        <Link href={`/teams/${team}`}>
          <Links
            text={"Ditt Lag"}
            icon={<AiOutlineTeam />}
            onClick={() => setDropdown(false)}
          />
        </Link>
        <Line />
        <Links
          text={"Vilkår for bruk"}
          icon={<IoMdCheckmarkCircleOutline />}
          onClick={() => {
            setShowTerms(!showTerms);
            setDropdown(false);
          }}
        />
        <Line />
        <Links
          text={"Logg Ut"}
          icon={<ImExit />}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "/";
          }}
        />
        <Links
          text={"Slett Bruker"}
          icon={<MdOutlineDeleteForever />}
          onClick={() => {
            setDropdown(false);
            setShowConfirmDelete(true);
          }}
        />
      </div>
    </motion.div>
  );
};

export default Dropdown;
