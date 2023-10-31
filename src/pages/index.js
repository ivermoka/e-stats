import Egenvurdering from "@/components/home/egenvurdering/egenvurdering";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { GetUser } from "@/actions/getUser";

export default function Index() {
  const user = GetUser();
  const [showEgenvurdering, setShowEgenvurdering] = useState(false);

  const buttonStyle =
    "dark:text-text text-textLight text-2xl font-semibold border-2 dark:border-primary border-secondaryLight rounded-md p-4 w-full";
  return (
    <>
      <div className="p-4 w-screen h-screen grid place-items-center">
        {!showEgenvurdering && (
          <div className="h-full flex flex-col justify-center gap-4 break-words">
            <motion.h1
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }}
              className="dark:text-text text-textLight font-semibold text-7xl text-center -mt-4"
            >
              e-sport dagboka
            </motion.h1>
            {user && (
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
                  className={buttonStyle}
                >
                  EGENVURDERING
                </motion.button>
              </Link>
            )}
            {!user && (
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
                    className={buttonStyle}
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
                    className={buttonStyle}
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
