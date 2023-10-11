import Link from "next/link";
import { useState } from "react";
import { GetUser } from "@/actions/getUser";
import Skoledropdown from "@/components/aboutyou/headlessuiDropdown";

const AboutYou = () => {
  const user = GetUser();
  const [skole, setSkole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const gameSelect = async (e) => {
    e.preventDefault();
    if (skole !== "") {
      try {
        const res = await fetch("/api/selectInfo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user, school: skole }),
        });
        if (res.status === 200) {
          window.location.href = "/";
        } else {
          const data = await res.json();
          console.log("Error", data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorMessage("*Du må velge skole");
    }
  };
  return (
    <div className="dark:bg-bg bg-bgLight h-screen w-screen flex justify-center items-center flex-col gap-4 fixed top-0 left-0 z-50 dark:text-text text-textLight">
      <h2 className="font-bold text-2xl italic ">Fortell oss litt om deg...</h2>
      <span className="font-light text-sm">
        (Du kan endre dette når som helst!)
      </span>
      <form className="dark:bg-primary bg-primaryLight h-3/5 w-80 rounded-lg shadow-md dark:shadow-accent shadow-accentLight flex flex-col gap-6 p-4 px-6 box-border font-semibold text-xl">
        <div className="flex flex-col gap-2 dark:bg-bg bg-secondaryLight p-4 rounded-lg">
          <select
            className="rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:bg-primary bg-primaryLight p-2"
            name="skole"
            defaultValue={skole}
            onChange={(e) => {
              setSkole(e.target.value);
            }}
          >
            <option value="" />
            <Skoledropdown />
            {/* <option value=""></option>
            <option value="Elvebakken">Elvebakken</option>
            <option value="Persbråten">Persbråten</option> */}
          </select>
        </div>
        <Link href="/">
          <button
            type="submit"
            onClick={(e) => gameSelect(e)}
            className="dark:bg-secondary bg-secondaryLight rounded-lg shadow-md dark:shadow-accent shadow-accentLight w-full font-bold italic p-2"
          >
            REGISTRER
          </button>
        </Link>
        <span className="text-red-700 italic text-center">{errorMessage}</span>
      </form>
    </div>
  );
};

{
  /* <form className="dark:bg-primary bg-primaryLight h-3/5 w-80 rounded-lg shadow-md dark:shadow-accent shadow-accentLight flex flex-col gap-6 p-4 px-6 box-border font-semibold text-xl">
  {" "}
  <div className="flex flex-col gap-2 dark:bg-bg bg-secondaryLight p-4 rounded-lg">
    {" "}
    Skole:{" "}
    <select
      className="rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:bg-primary bg-primaryLight p-2"
      name="skole"
      defaultValue={skole}
      onChange={(e) => {
        setSkole(e.target.value);
      }}
    >
      {" "}
      <option value="" /> <option value="Elvebakken">Elvebakken</option>{" "}
      <option value="Persbråten">Persbråten</option>{" "}
    </select>{" "}
  </div>{" "}
  <Link href="/">
    {" "}
    <button
      type="submit"
      onClick={(e) => gameSelect(e)}
      className="dark:bg-secondary bg-secondaryLight rounded-lg shadow-md dark:shadow-accent shadow-accentLight w-full font-bold italic p-2"
    >
      {" "}
      REGISTRER{" "}
    </button>{" "}
  </Link>{" "}
  <span className="text-red-700 italic text-center">{errorMessage}</span>{" "}
</form>; */
}

export default AboutYou;
