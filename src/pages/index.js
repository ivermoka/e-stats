import Egenvurdering from "@/components/home/egenvurdering/egenvurdering";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Index() {
  const [storedToken, setStoredToken] = useState("");
  useEffect(() => {
    setStoredToken(localStorage.getItem("token"));
  }, []);

  const [showEgenvurdering, setShowEgenvurdering] = useState(false);
  return (
    <>
      <div className="p-4 w-screen min-h-screen grid place-items-center">
        {!showEgenvurdering && (
          <div className="h-full flex flex-col justify-center gap-4 break-words">
            <motion.h1
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }}
              className="text-text font-bold text-7xl text-center"
            >
              e-sport dagboka
            </motion.h1>
            {storedToken && (
              <Link href={"/egenvurdering"}>
                {" "}
                <motion.button
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    type: "spring",
                    delay: 0.3,
                  }}
                  className="text-text font-semibold text-2xl bg-primary rounded-lg p-4 shadow-md shadow-accent w-full"
                >
                  EGENVURDERING
                </motion.button>
              </Link>
            )}
            {!storedToken && (
              <div className="flex justify-center text-text font-semibold text-xl gap-2">
                <Link href="/login">
                  <motion.button
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      type: "spring",
                      delay: 0.3,
                    }}
                    className="bg-primary rounded-lg p-4 shadow-md shadow-accent w-36"
                  >
                    Logg Inn
                  </motion.button>
                </Link>
                <Link href="register">
                  <motion.button
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      type: "spring",
                      delay: 0.5,
                    }}
                    className="bg-primary rounded-lg p-4 shadow-md shadow-accent w-36"
                  >
                    Registrer
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        )}
        {showEgenvurdering && (
          <Egenvurdering setShowEgenvurdering={setShowEgenvurdering} />
        )}
      </div>
    </>
  );
}
