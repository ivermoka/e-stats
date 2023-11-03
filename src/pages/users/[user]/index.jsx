import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Card from "../../../components/profile/profilKort";
import Edit from "../../../components/profile/endreProfil";
import { motion } from "framer-motion";
import { GetUser } from "@/actions/getUser";
import Loading from "@/components/loading";

const Profil = () => {
  const [takingTime, setTakingTime] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const url = usePathname();
  const [owned, setOwned] = useState(false);
  const user = GetUser();

  useEffect(() => {
    if (typeof window !== "undefined" && url !== null) {
      const urlParts = url.split("/");
      if (urlParts.length >= 3) {
        const newId = urlParts[2];
        setId(newId);
      }
    }
  }, [url]);

  useEffect(() => {
    if (user !== null && id === user) {
      setOwned(true);
    } else {
      setOwned(false);
    }
  }, [id, user]);

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  const [data, setData] = useState(null);

  const getUserData = async () => {
    try {
      const res = await fetch("/api/getUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: id,
        }),
      });
      if (res.status === 200) {
        setData(await res.json());
      } else {
        console.log("not work");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      if (!data.school) {
        data.school = "Ikke valgt";
      }
      if (!data.team) {
        data.team = "Ikke valgt";
      }
      setLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTakingTime(
        "Dette ser ut til å ta litt tid, pass på at brukeren du prøver å gå inn på eksisterer",
      );
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const boxStyle =
    "dark:bg-primary bg-primaryLight p-4 rounded-lg shadow-md dark:shadow-accent shadow-accentLight";

  return (
    <div className="h-screen w-screen p-8 flex flex-col gap-4 dark:text-text text-textLight overflow-x-hidden">
      {loaded ? (
        <>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }}
            className={"font-bold text-xl italic mt-16"}
          >
            Personlig Informasjon
          </motion.div>
          <Card
            id={id}
            setModalOpen={setModalOpen}
            data={data}
            user={user}
            owned={owned}
          />
          {modalOpen && (
            <Edit
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              id={id}
              setId={setId}
            />
          )}
          {owned && (
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
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loading />
          <span className="mt-32 text-center">{takingTime}</span>
        </div>
      )}
    </div>
  );
};

export default Profil;
