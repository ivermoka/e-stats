import React, { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { GiFlashGrenade } from "react-icons/gi";
import { Switch } from "@headlessui/react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    if (dark) {
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

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
          dark ? "bg-blue-600" : "bg-secondaryLight"
        } relative inline-flex h-8 w-14 items-center rounded-full`}
      >
        <span
          className={`${
            dark ? "translate-x-8" : "translate-x-1"
          } inline-block h-5 w-5 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  );
};

export default ThemeToggle;
