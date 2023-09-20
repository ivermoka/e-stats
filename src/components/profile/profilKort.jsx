import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { AiFillFire } from "react-icons/ai";

const ProfilKort = ({ id }) => {
  const [profilePicture, setProfilePicture] = useState("/logo.png");

  const boxStyle = "bg-primary p-4 rounded-lg shadow-md shadow-accent";
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
        <div className={`bg-primary rounded-full shadow-md shadow-accent w-24`}>
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
        <li className={`${boxStyle}`}>Skole: </li>
        <li className={`${boxStyle}`}>Spill: </li>
        <li className={`${boxStyle}`}>Lag: </li>
      </ul>
    </motion.div>
  );
};

export default ProfilKort;
