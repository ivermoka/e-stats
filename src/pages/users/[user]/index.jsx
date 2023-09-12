import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Card from "../../../components/profile/profilKort";
import Edit from "../../../components/profile/endreProfil";
import { motion } from "framer-motion";

const Profil = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const url = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && url !== null) {
      const urlParts = url.split("/");
      if (urlParts.length >= 3) {
        const newId = urlParts[2];
        setId(newId);
      }
    }
  }, [url]);

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

  const boxStyle = "bg-primary p-4 rounded-lg shadow-md shadow-accent";

  return (
    <div className="h-screen p-8 flex flex-col gap-8 text-text overflow-x-hidden">
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }}
        className={`font-bold text-xl italic mt-16 ${boxStyle}`}
      >
        Personlig Informasjon
      </motion.div>
      <Card id={id} setModalOpen={setModalOpen} />
      {modalOpen && (
        <Edit
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          id={id}
          setId={setId}
        />
      )}
      <div className="flex justify-between font-semibold text-xl text-center">
        <motion.button
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            delay: 0.5,
          }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "/";
          }}
          className={`${boxStyle} w-[45%] text-red-400`}
        >
          Logg Ut
        </motion.button>
        {owned && (
          <motion.button
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              type: "spring",
              delay: 0.55,
            }}
            className={`${boxStyle} w-[45%] text-center text-blue-300`}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Endre
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Profil;
