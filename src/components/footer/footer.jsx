import Link from "./links";
import Image from "next/image";
import { useState, useEffect } from "react";

const Footer = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);
  return (
    <footer className="bg-bg border-t-2 border-text flex flex-col p-4">
      <div className="flex flex-wrap w-full gap-2 text-text/80 text-md font-semibold italic">
        <Link link="/" text="Hjem" />
        <span>|</span>
        <Link link="/stats" text="Statistikk" />
        <span>|</span>
        <Link link={`/users/${user}`} text="Profil" />
        <span>|</span>
        <Link link="/" text="Vilkår for bruk" />
        <span>|</span>
        <Link
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "/";
          }}
          link="/"
          text="Logg Ut"
        />
        <span>|</span>
        <Link link="/" text="Slett bruker" />
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <Image
          className="m-8 opacity-50"
          priority
          alt="elvebakken logo"
          src="/logo.png"
          width={150}
          height={50}
        />
        <div className="text-text">
          Har du noen problemer? Kontakt oss:{" "}
          <span className="underline">elura001@osloskolen.no</span> eller
          <span className="underline"> 420 69 123</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
