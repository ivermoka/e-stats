import { motion } from "framer-motion";

const ProfilKort = ({ id }) => {
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
      <div className="box-border p-4 text-3xl font-bold flex justify-between">
        <div className={`${boxStyle} text-center`}>{id}</div>{" "}
      </div>
      <ul className="p-4 text-xl font-semibold flex flex-col gap-4">
        <li className={`${boxStyle}`}>Spill: </li>
        <li className={`${boxStyle}`}>Lag: </li>
        <li className={`${boxStyle}`}>Passord: ****</li>
      </ul>
    </motion.div>
  );
};

export default ProfilKort;
