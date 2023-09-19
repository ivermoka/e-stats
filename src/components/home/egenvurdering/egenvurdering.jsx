import Day from "./day";
import DisclosureMenu from "./disclosure";
import Comment from "./comment";
import { useState, useEffect } from "react";
import { AiOutlineRollback } from "react-icons/ai";
import Link from "next/link";

const Egenvurdering = ({}) => {
  const [hasRated, setHasRated] = useState(true);
  const [date, setDate] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
      setDate(new Date().toLocaleDateString());
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSessionData();
    }
  }, [user]);

  const [disclosure1, setDisclosure1] = useState(0);
  const [disclosure2, setDisclosure2] = useState(0);
  const [disclosure3, setDisclosure3] = useState(0);
  const [disclosure4, setDisclosure4] = useState(0);
  const [disclosure5, setDisclosure5] = useState(0);
  const [disclosure6, setDisclosure6] = useState(0);
  const [comment, setComment] = useState("");

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
          disclosure6: disclosure6,
          comment: comment,
          date: date,
          user: user,
        }),
      });

      if (res.status === 201) {
        window.location.href = "/";
        console.log("Day registered");
      } else {
        const data = await res.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSessionData = async () => {
    try {
      const res = await fetch(`/api/getUser?user=${user}&date=${date}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 202) {
        setHasRated(true);
      } else if (res.status === 201) {
        setHasRated(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const boxStyle =
    "bg-primary rounded-lg p-2 shadow-md shadow-accent font-semibold text-center text-2xl";

  return (
    <>
      {hasRated ? (
        <div className="text-text h-screen mt-20 flex flex-col items-center gap-8">
          <div className={`${boxStyle}`}>
            Det eksisterer allerede en egenvurdering for denne dagen
          </div>
          <div className={`${boxStyle}`}>Du kan...</div>
          <div className={"flex gap-4"}>
            <Link href={"/stats"} className={`${boxStyle} w-36`}>
              Se stats
            </Link>
            <Link href={`/users/${user}`} className={`${boxStyle} w-36`}>
              Se profil
            </Link>
          </div>
          <div className={`${boxStyle}`}>Eller...</div>{" "}
          <button className={`${boxStyle}`}>Slette egenvurderingen...</button>
        </div>
      ) : (
        <form
          onSubmit={rateDay}
          className="mb-20 xs:p-4 mt-16 overflow-x-hidden"
        >
          <div className="flex justify-between">
            <Day />
            <Link href={"/"}>
              <div className="rounded-lg text-text font-bold p-2 my-4 w-10 text-center italic bg-primary shadow-md shadow-accent">
                <AiOutlineRollback className="w-full h-full" />
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-2 bg-primary rounded-lg">
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
            <DisclosureMenu
              setDisclosure={setDisclosure6}
              header="Hvordan spilte jeg?"
            />
          </div>
          <Comment setComment={setComment} />
          <button
            type="submit"
            className="rounded-lg bg-primary p-3 shadow-md shadow-accent text-text font-bold italic my-4"
          >
            LAGRE
          </button>
        </form>
      )}
    </>
  );
};

export default Egenvurdering;
