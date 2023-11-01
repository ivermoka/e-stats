import React, { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { GiFlashGrenade } from "react-icons/gi";
import { Switch } from "@headlessui/react";

const ThemeToggle = () => {
  // definerer state til dark, true = dark mode, false = light mode
  const [dark, setDark] = useState(false);

  // sjekker theme som er lagret i localstorage og setter klassen som styrer theme til det den er
  useEffect(() => {
    const getTheme = localStorage.getItem("theme");
    if (getTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [dark]);

  // funksjon som sjekker hvilket theme som er valgt akkuratt nå, og setter til det motsatte
  const toggleTheme = () => {
    if (dark) {
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  // setter dark til hva theme er i localstorage
  useEffect(() => {
    const getTheme = localStorage.getItem("theme");
    if (getTheme === "dark") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  return (
    <div className="h-12 aspect-square grid place-items-center">
      <Switch
        checked={dark}
        onChange={toggleTheme}
        className={`${
          dark ? "bg-blue-700" : "bg-secondaryLight"
        } relative inline-flex h-8 w-14 items-center rounded-full`}
      >
        {dark && <BsFillMoonStarsFill className="absolute ml-2" />}
        <span
          className={`${
            dark ? "translate-x-8" : "translate-x-1"
          } inline-block h-5 w-5 transform rounded-full bg-white transition`}
        />
        {!dark && <GiFlashGrenade className="absolute ml-8" />}
      </Switch>
    </div>
  );
};

export default ThemeToggle;
