import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Card from "../../../components/profile/profilKort";
import Edit from "../../../components/profile/endreProfil";

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

  const user = "test";
  return (
    <div className="h-screen p-8 flex flex-col gap-8 text-text">
      <h2 className="font-bold text-xl italic mt-14">Personlig Informasjon</h2>
      <Card id={id} user={user} setModalOpen={setModalOpen} />
      {modalOpen && (
        <Edit modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} />
      )}
    </div>
  );
};

export default Profil;
