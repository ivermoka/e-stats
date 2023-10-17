import React, { useEffect, useState } from "react";
import Egenvurdering from "@/components/home/egenvurdering/egenvurdering";
import After from "@/components/home/egenvurdering/after";
import Selector from "@/components/home/egenvurdering/selector";
import HasRatedPage from "@/components/home/egenvurdering/hasRatedPage";
import ReactLoading from "react-loading";
import { GetUser } from "@/actions/getUser";

const EgenvurderingContainer = () => {
  const user = GetUser();
  const [date, setDate] = useState(null);
  const [showAfter, setShowAfter] = useState(false);
  const [hasRated1, setHasRated1] = useState(true);
  const [hasRated2, setHasRated2] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setDate(new Date().toLocaleDateString("en-US"));
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
        setHasRated1(true);
      } else if (res.status === 201) {
        setHasRated1(false);
      } else if (res.status === 203) {
        setHasRated2(false);
        setShowAfter(true);
      } else if (res.status === 204) {
        setHasRated2(true);
      }
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"p-4 min-h-screen"}>
      {user ? (
        <>
          {loaded ? (
            <>
              {showAfter ? (
                <>
                  {hasRated2 ? (
                    <HasRatedPage user={user} />
                  ) : (
                    <After date={date} user={user} />
                  )}
                </>
              ) : (
                <>
                  {hasRated1 ? (
                    <HasRatedPage user={user} />
                  ) : (
                    <Egenvurdering
                      date={date}
                      user={user}
                      hasRated={hasRated1}
                      setHasRated={setHasRated1}
                      setShowAfter={setShowAfter}
                    />
                  )}
                </>
              )}
              <Selector showAfter={showAfter} setShowAfter={setShowAfter} />
            </>
          ) : (
            <div className="h-screen grid place-items-center">
              <ReactLoading type={"bars"} color={"black"} width={200} />
            </div>
          )}
        </>
      ) : (
        <h1 className="text-text mt-20">use doesnt exist</h1>
      )}
    </div>
  );
};

export default EgenvurderingContainer;
