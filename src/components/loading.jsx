import ReactLoading from "react-loading";
import { useState, useEffect } from "react";

const Loading = () => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);
  return (
    <div className="h-screen absolute inset-0 flex justify-center items-center">
      <ReactLoading
        color={theme === "dark" ? "white" : "black"}
        width={100}
        type="spin"
      />
    </div>
  );
};

export default Loading;
