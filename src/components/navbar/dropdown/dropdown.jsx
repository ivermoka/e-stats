import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserInfo from "./userInfo";
import Links from "./dropdownLink";
import Line from "./sepLine";
import Link from "next/link";
import ThemeToggle from "@/components/navbar/dropdown/themeToggle";

import { RxCross1 } from "react-icons/rx";
import { BiUser } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

const Dropdown = ({
  dropdown,
  user,
  setDropdown,
  showTerms,
  setShowTerms,
  setShowConfirmDelete,
}) => {
  const [team, setTeam] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user !== null) {
      fetchSessionData().then();
    }
  }, []);
  const fetchSessionData = async () => {
    try {
      const res = await fetch("/api/getUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user }),
      });
      if (res.status === 200) {
        const data = await res.json();
        setTeam(data.team);
        if (data.isAdmin) {
          setAdmin(true);
        }
      } else if (res.status === 405) {
        console.log("Error fetching data");
      }
    } catch (err) {
      console.log(err);
    }
  };
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
          "h-16 w-screen px-2 dark:border-primary border-primaryLight border-b-2 flex justify-between items-center"
        }
      >
        <ThemeToggle />
        <button
          type="button"
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <RxCross1 className={"dark:text-text text-textLight text-4xl"} />
        </button>
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
        {team ? (
          <Link href={`/teams/${team}`}>
            <Links
              text={"Ditt Lag"}
              icon={<AiOutlineTeam />}
              onClick={() => setDropdown(false)}
            />
          </Link>
        ) : (
          <Link href={"/teams/noteam"}>
            <Links
              text={"Ditt Lag"}
              icon={<AiOutlineTeam />}
              onClick={() => setDropdown(false)}
            />
          </Link>
        )}
        {admin && (
          <Link href="/admin">
            <Links
              onClick={() => {
                setDropdown(false);
              }}
              text={"Trener UI"}
              icon={<RiAdminLine />}
            />
          </Link>
        )}
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
