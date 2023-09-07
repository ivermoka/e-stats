import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Card from "../../../components/profile/profilKort";
import Edit from "../../../components/profile/endreProfil";
import Button from "@/components/profile/button";

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
    <div className="h-screen p-8 flex flex-col gap-8 text-text">
      <h2 className="font-bold text-xl italic">Personlig Informasjon</h2>
      <Card id={id} setModalOpen={setModalOpen} />
      {modalOpen && (
        <Edit modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} />
      )}
      <Button
        text="Logg Ut"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "/";
        }}
      />
    </div>
  );
};

export default Profil;
