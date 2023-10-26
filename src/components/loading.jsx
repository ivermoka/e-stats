import ReactLoading from "react-loading";
import { useState, useEffect } from "react";

const Loading = () => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);
  return (
    <div className="h-screen flex justify-center items-center">
      {theme === "dark" ? (
        <ReactLoading color="white" width={100} type="spin" />
      ) : (
        <ReactLoading color="black" width={100} type="spin" />
      )}
      ;
    </div>
  );
};

export default Loading;
