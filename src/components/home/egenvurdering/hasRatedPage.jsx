import Link from "next/link";
import React from "react";
import ConfirmDeleteRating from "@/components/home/egenvurdering/confirmDeleteRating";
import { useState } from "react";

const HasRatedPage = ({ user }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
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
          user: user,
          date: new Date().toLocaleDateString("en-US"),
        }),
      });
      if (res.status === 200) {
        console.log(res.status);
        window.location.href = "/";
      } else if (res.status === 400) {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dark:text-text text-textLight mt-16 flex flex-col items-center gap-8 absolute inset-0">
      <div
        className={`${boxStyle} dark:bg-transparent bg-transparent shadow-none`}
      >
        Det eksisterer allerede en egenvurdering for denne dagen
      </div>
      <div
        className={`${boxStyle} dark:bg-transparent bg-transparent shadow-none`}
      >
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
      <div
        className={`${boxStyle} dark:bg-transparent bg-transparent shadow-none`}
      >
        Eller...
      </div>{" "}
      <button
        onClick={() => setShowConfirmDelete(true)}
        className={`${boxStyle}`}
        type="button"
      >
        Slette egenvurderingen...
      </button>
      {showConfirmDelete && (
        <ConfirmDeleteRating
          deleteRating={deleteRating}
          setShowConfirmDelete={setShowConfirmDelete}
          user={user}
        />
      )}
    </div>
  );
};

export default HasRatedPage;
