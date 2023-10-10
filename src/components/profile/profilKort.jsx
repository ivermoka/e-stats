import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const ProfilKort = ({ id, data }) => {
  const [profilePicture, setProfilePicture] = useState("/logo.png");

  const boxStyle =
    "dark:bg-primary bg-primaryLight p-4 rounded-lg shadow-md dark:shadow-accent shadow-accentLight";
  return (
    <motion.div
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        delay: 0.2,
      }}
    >
      <div className="box-border p-4 text-3xl font-bold flex gap-2">
        <div
          className={
            "dark:bg-primary bg-primaryLight rounded-full shadow-md dark:shadow-accent shadow-accentLight w-24"
          }
        >
          <Image
            src={profilePicture}
            alt="profile picture"
            width={200}
            height={200}
          />
        </div>
        <div className={`${boxStyle} text-center w-full flex`}>{id}</div>
      </div>
      <ul className="p-4 text-xl font-semibold flex flex-col gap-4">
        <li className={`${boxStyle}`}>Skole: {data.school}</li>
        <li className={`${boxStyle}`}>Lag: {data.team}</li>
      </ul>
    </motion.div>
  );
};

export default ProfilKort;
