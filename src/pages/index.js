import { motion } from "framer-motion";
import Link from "next/link";
import { GetUser } from "@/actions/getUser";

export default function Index() {
  const user = GetUser();

  const buttonStyle =
    "dark:text-text text-textLight text-2xl font-semibold border-2 dark:border-primary border-secondaryLight rounded-md p-4 sm:w-1/2 w-full";
  return (
    <div className="overscroll-none fixed inset-0 overflow-hidden p-4 flex flex-col justify-center gap-4 dark:bg-bg bg-bgLight">
      <motion.h1
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }}
        className="dark:text-text text-textLight font-semibold text-7xl text-center -mt-14 mb-4"
      >
        e-stats
      </motion.h1>
      {user !== "no" && user ? (
        <Link className={"flex justify-center"} href={"/egenvurdering"}>
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
      ) : (
        <div className="flex justify-center text-text font-semibold text-xl gap-2">
          <Link className="sm:w-1/2 w-full flex justify-end" href="/login">
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
          <Link className="sm:w-1/2 w-full" href="register">
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
  );
}
