import Day from "./day";
import DisclosureMenu from "./disclosure";
import React, { useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";
import Link from "next/link";

const Egenvurdering = ({ date, user, setShowAfter }) => {
  const [disclosure1, setDisclosure1] = useState(0);
  const [disclosure2, setDisclosure2] = useState(0);
  const [disclosure3, setDisclosure3] = useState(0);
  const [disclosure4, setDisclosure4] = useState(0);
  const [disclosure5, setDisclosure5] = useState(0);

  const rateDay = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/registerDay", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disclosure1: disclosure1,
          disclosure2: disclosure2,
          disclosure3: disclosure3,
          disclosure4: disclosure4,
          disclosure5: disclosure5,
          date: date,
          user: user,
        }),
      });
      if (res.status === 201) {
        setShowAfter(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={rateDay} className="mb-20 xs:p-4 mt-16 overflow-x-hidden">
        <div className="flex justify-between">
          <Day />
          <Link href={"/"}>
            <div className="rounded-lg dark:text-text text-textLight font-bold p-2 my-4 w-10 text-center italic dark:bg-primary bg-primaryLight shadow-md dark:shadow-accent shadow-accentLight">
              <AiOutlineRollback className="w-full h-full" />
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-2 dark:bg-primary bg-primaryLight rounded-lg">
          <DisclosureMenu
            setDisclosure={setDisclosure1}
            header="Hvor fornuftig har jeg spist i dag?"
          />
          <DisclosureMenu
            setDisclosure={setDisclosure2}
            header="Hvor godt har jeg sovet i natt?"
          />
          <DisclosureMenu
            setDisclosure={setDisclosure3}
            header="Hvor motivert er jeg for å spille i dag?"
          />
          <DisclosureMenu
            setDisclosure={setDisclosure4}
            header="Hvordan føler jeg meg fysisk?"
          />
          <DisclosureMenu
            setDisclosure={setDisclosure5}
            header="Hvordan føler jeg meg psykisk?"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg dark:bg-primary bg-primaryLight p-3 shadow-md dark:shadow-accent shadow-accentLight dark:text-text text-textLight font-bold italic my-4"
        >
          LAGRE
        </button>
      </form>
    </>
  );
};

export default Egenvurdering;
