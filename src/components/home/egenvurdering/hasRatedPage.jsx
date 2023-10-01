import Link from "next/link";
import React from "react";

const HasRatedPage = ({ user }) => {
  const boxStyle =
    "dark:bg-primary bg-primaryLight rounded-lg p-2 shadow-md dark:shadow-accent shadow-accentLight font-semibold text-center text-2xl";

    const deleteRating = async () => {
        try {
            const res = await fetch("/api/deleteRating", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: localStorage.getItem("username"),
                }),
            });
            if (res.status === 200) {
                window.location.href = "/";
            } else if (res.status === 400) {
                console.log(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
      <button onClick={deleteRating} className={`${boxStyle}`}>Slette egenvurderingen...</button>
    </div>
  );
};

export default HasRatedPage;
