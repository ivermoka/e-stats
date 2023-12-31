import { motion } from "framer-motion";
import Image from "next/image";

const ProfilKort = ({ id, data }) => {
  const boxStyle = "p-4 border-b-2 border-secondaryLight dark:border-primary";
  return (
    <>
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
          <div className={"w-24"}>
            <Image
              src={"/logo.png"}
              alt="profile picture"
              width={200}
              height={200}
            />
          </div>
          <div className={`${boxStyle} text-center w-full flex`}>{id}</div>
        </div>
        <ul className="p-4 text-xl font-semibold flex flex-col gap-4">
          <li className={`${boxStyle}`}>Skole: {data.school}</li>
          <li className={`${boxStyle} flex justify-between`}>
            <span>Lag: {data.team}</span>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default ProfilKort;
