import React, { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { GiFlashGrenade } from "react-icons/gi";

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
      {dark ? (
        <button onClick={toggleTheme}>
          <GiFlashGrenade className="text-text text-3xl" />
        </button>
      ) : (
        <button onClick={toggleTheme}>
          <BsFillMoonStarsFill className="text-textLight text-3xl" />
        </button>
      )}
    </div>
  );
};

export default ThemeToggle;
