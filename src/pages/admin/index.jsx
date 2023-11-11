import { useState, useEffect } from "react";
import Admin from "./admin";
import { GetUser } from "@/actions/getUser";
import Loading from "@/components/loading";

const AdminPage = () => {
  const user = GetUser();
  const [admin, setAdmin] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSessionData();
    }
  }, [user]);

  const fetchSessionData = async () => {
    try {
      const res = await fetch("/api/getUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user }),
      });
      if (res.status === 200) {
        const data = await res.json();
        if (data.isAdmin) {
          setAdmin(true);
        }
        setLoaded(true);
      } else if (res.status === 405) {
        console.log("Error fetching data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-bgLight dark:bg-bg min-h-screen w-screen overflow-x-hidden">
      {loaded ? (
        <>
          {admin ? (
            <Admin user={user} />
          ) : (
            <h1 className="dark:text-text text-textLight text-xl font-bold italic mt-20 ml-4">
              Du har ikke tilgang til denne siden
            </h1>
          )}{" "}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AdminPage;
