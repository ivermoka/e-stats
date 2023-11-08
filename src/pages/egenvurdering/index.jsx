import React, { useEffect, useState } from "react";
import Egenvurdering from "@/components/home/egenvurdering/egenvurdering";
import After from "@/components/home/egenvurdering/after";
import Selector from "@/components/home/egenvurdering/selector";
import HasRatedPage from "@/components/home/egenvurdering/hasRatedPage";
import Loading from "@/components/loading";
import { GetUser } from "@/actions/getUser";

const EgenvurderingContainer = () => {
  const user = GetUser();
  const date = new Date().toLocaleDateString("en-US");
  const [showAfter, setShowAfter] = useState(false);
  const [hasRated1, setHasRated1] = useState(true);
  const [hasRated2, setHasRated2] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSessionData();
    } else if (user === "no") {
      setLoaded(true);
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
      if (res.status === 201) {
        setHasRated1(false);
      } else if (res.status === 203) {
        setShowAfter(true);
        setHasRated2(false);
      } else if (res.status === 202) {
        setHasRated2(true);
      }
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"p-4 bg-bgLight dark:bg-bg min-h-screen w-screen"}>
      {loaded ? (
        <>
          {user === "no" ? (
            <h1 className="dark:text-text text-textLight text-xl font-bold italic mt-14">
              Du må logge inn for å lage egenvurdering!
            </h1>
          ) : (
            <>
              {showAfter ? (
                <>
                  {hasRated2 ? (
                    <HasRatedPage user={user} />
                  ) : (
                    <>
                      <After date={date} user={user} />
                      <Selector
                        showAfter={showAfter}
                        setShowAfter={setShowAfter}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  {hasRated1 ? (
                    <HasRatedPage user={user} />
                  ) : (
                    <>
                      <Egenvurdering
                        date={date}
                        user={user}
                        hasRated={hasRated1}
                        setHasRated={setHasRated1}
                        setShowAfter={setShowAfter}
                      />
                      <Selector
                        showAfter={showAfter}
                        setShowAfter={setShowAfter}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EgenvurderingContainer;
