import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Card from "../../../components/profile/profilKort";
import Edit from "../../../components/profile/endreProfil";
import Button from "@/components/profile/button";
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

  return (
    <div className="h-screen p-8 flex flex-col gap-8 text-text overflow-x-hidden">
      <motion.h2
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }}
        className="font-bold text-xl italic mt-16"
      >
        Personlig Informasjon
      </motion.h2>
      <Card id={id} setModalOpen={setModalOpen} />
      {modalOpen && (
        <Edit
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          id={id}
          setId={setId}
        />
      )}
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
        className="bg-bg border-primary border-2 rounded-md"
      >
        Logg Ut
      </motion.button>
    </div>
  );
};

export default Profil;
