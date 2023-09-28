import "@/styles/globals.css";
import Layout from "./../layouts/defaultLayout";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const getTheme = localStorage.getItem("theme");
    if (getTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
