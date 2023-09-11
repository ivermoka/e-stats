import { useEffect, useState } from "react";
import Button from "./button";
import { motion } from "framer-motion";

const ProfilKort = ({ setModalOpen, id }) => {
  const [owned, setOwned] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);

  useEffect(() => {
    if (user !== null && id == user) {
      setOwned(true);
    } else {
      setOwned(false);
    }
  }, [id, user]);

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
      className="border-2 border-primary rounded-lg"
    >
      <div className="bg-primary box-border p-4 text-3xl font-bold">{id}</div>
      <ul className="p-4 text-xl font-semibold flex flex-col gap-2">
        <li>Spill: </li>
        <li>Lag: </li>
        <li>Passord: ****</li>
        {owned && <Button onClick={() => setModalOpen(true)} text="ENDRE" />}
      </ul>
    </motion.div>
  );
};

export default ProfilKort;
