import { BsMoonStars } from "react-icons/bs";
import { GiFlashGrenade } from "react-icons/gi";
import { useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");
  return (
    <div className={"h-12 aspect-square grid place-items-center"}>
      {theme === "dark" ? (
        <GiFlashGrenade className={"text-text text-3xl"} />
      ) : (
        <BsMoonStars className={"text-text text-3xl"} />
      )}
    </div>
  );
};

export default ThemeToggle;
