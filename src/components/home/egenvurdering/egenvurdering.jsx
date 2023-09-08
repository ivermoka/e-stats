import Day from "./day";
import DisclosureMenu from "./disclosure";
import Comment from "./comment";
import { useState } from "react";

const Egenvurdering = () => {
  const [disclosure1, setDisclosure1] = useState(0);
  const [disclosure2, setDisclosure2] = useState(0);
  const [disclosure3, setDisclosure3] = useState(0);
  const [disclosure4, setDisclosure4] = useState(0);
  const [disclosure5, setDisclosure5] = useState(0);
  const [disclosure6, setDisclosure6] = useState(0);

  const handleSubmit = async () => {
    console.log(
      "Mat:",
      disclosure1,
      "Søvn:",
      disclosure2,
      "Motivasjon:",
      disclosure3,
      "Fysisk:",
      disclosure4,
      "Psykisk:",
      disclosure5,
      "Spill:",
      disclosure6
    );
  };
  return (
    <form onSubmit={handleSubmit} className="min-h-screen">
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
      <Comment />
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
