import Link from "next/link";
import React from "react";

const HasRatedPage = ({ user }) => {
  const boxStyle =
    "dark:bg-primary bg-primaryLight rounded-lg p-2 shadow-md dark:shadow-accent shadow-accentLight font-semibold text-center text-2xl";
  return (
    <div className="dark:text-text text-textLight h-screen mt-20 flex flex-col items-center gap-8">
      <div className={`${boxStyle} bg-transparent shadow-transparent`}>
        Det eksisterer allerede en egenvurdering for denne dagen
      </div>
      <div className={`${boxStyle} bg-transparent shadow-transparent`}>
        Du kan...
      </div>
      <div className={"flex gap-4"}>
        <Link href={"/stats"} className={`${boxStyle} w-36`}>
          Se stats
        </Link>
        <Link href={`/users/${user}`} className={`${boxStyle} w-36`}>
          Se profil
        </Link>
      </div>
      <div className={`${boxStyle} bg-transparent shadow-transparent`}>
        Eller...
      </div>{" "}
      <button className={`${boxStyle}`}>Slette egenvurderingen...</button>
    </div>
  );
};

export default HasRatedPage;
