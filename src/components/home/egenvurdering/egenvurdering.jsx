import Day from "./day";
import DisclosureMenu from "./disclosure";
import Comment from "./comment";
import { useState, useEffect } from "react";
import { AiOutlineRollback } from "react-icons/ai";

const Egenvurdering = ({ setShowEgenvurdering }) => {
  const [hasRated, setHasRated] = useState(true);
  const [date, setDate] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
      setDate(new Date().toLocaleDateString());
      fetchSessionData();
    }
  }, []);

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
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSessionData = async () => {
    try {
      const res = await fetch(`/api/fetchUser?user=${user}&date=${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setHasRated(false);
      } else {
        setHasRated(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {hasRated ? (
        <h1 className="text-text">
          Du har allerede levert egenvurdering i dag
        </h1>
      ) : (
        <form onSubmit={rateDay} className="min-h-screen mb-20">
          <div className="flex justify-between">
            <Day />
            <div
              onClick={() => setShowEgenvurdering(false)}
              className="rounded-lg text-text font-bold p-2 my-4 w-10 text-center italic bg-primary shadow-md shadow-accent"
            >
              <AiOutlineRollback className="w-full h-full" />
            </div>
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
