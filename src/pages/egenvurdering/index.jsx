import React, { useEffect, useState } from "react";
import Egenvurdering from "@/components/home/egenvurdering/egenvurdering";
import After from "@/components/home/egenvurdering/after";
import Selector from "@/components/home/egenvurdering/selector";
import Link from "next/link";
import ReactLoading from "react-loading";

const EgenvurderingContainer = () => {
  const [date, setDate] = useState(null);
  const [user, setUser] = useState(null);
  const [showAfter, setShowAfter] = useState(false);
  const [hasRated, setHasRated] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
      setDate(new Date().toLocaleDateString());
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSessionData();
    }
  }, [user]);

  const fetchSessionData = async () => {
    try {
      const res = await fetch(`/api/getUser?user=${user}&date=${date}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 202) {
        setHasRated(true);
      } else if (res.status === 201) {
        setHasRated(false);
      }
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const boxStyle =
    "bg-primary rounded-lg p-2 shadow-md shadow-accent font-semibold text-center text-2xl";
  return (
    <div className={"p-4 min-h-screen"}>
      {loaded ? (
        <>
          {hasRated ? (
            <div className="text-text h-screen mt-20 flex flex-col items-center gap-8">
              <div className={`${boxStyle}`}>
                Det eksisterer allerede en egenvurdering for denne dagen
              </div>
              <div className={`${boxStyle}`}>Du kan...</div>
              <div className={"flex gap-4"}>
                <Link href={"/stats"} className={`${boxStyle} w-36`}>
                  Se stats
                </Link>
                <Link href={`/users/${user}`} className={`${boxStyle} w-36`}>
                  Se profil
                </Link>
              </div>
              <div className={`${boxStyle}`}>Eller...</div>{" "}
              <button className={`${boxStyle}`}>
                Slette egenvurderingen...
              </button>
            </div>
          ) : (
            <>
              {showAfter ? (
                <After date={date} user={user} />
              ) : (
                <Egenvurdering
                  date={date}
                  user={user}
                  hasRated={hasRated}
                  setHasRated={setHasRated}
                  setShowAfter={setShowAfter}
                />
              )}
              <Selector setShowAfter={setShowAfter} />
            </>
          )}
        </>
      ) : (
        <div className="h-screen grid place-items-center">
          <ReactLoading type={"bars"} color={"#292841"} width={200} />
        </div>
      )}
    </div>
  );
};

export default EgenvurderingContainer;
