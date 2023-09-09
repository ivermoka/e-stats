import Day from "./day";
import DisclosureMenu from "./disclosure";
import Comment from "./comment";
import { useState, useEffect } from "react";

const Egenvurdering = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);

  const [disclosure1, setDisclosure1] = useState(0);
  const [disclosure2, setDisclosure2] = useState(0);
  const [disclosure3, setDisclosure3] = useState(0);
  const [disclosure4, setDisclosure4] = useState(0);
  const [disclosure5, setDisclosure5] = useState(0);
  const [disclosure6, setDisclosure6] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await fetch(`/api/logSession`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          food: disclosure1,
          sleep: disclosure2,
          motivation: disclosure3,
          physical: disclosure4,
          psychological: disclosure5,
          played: disclosure6,
          comment: comment,
          user: user,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="min-h-screen mt-20">
      <Day />
      <div className="flex flex-col gap-2 bg-secondary rounded-md">
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
        className="rounded-md border-primary border-2 p-2 text-text font-bold italic my-4"
      >
        LAGRE
      </button>
    </form>
  );
};

export default Egenvurdering;
