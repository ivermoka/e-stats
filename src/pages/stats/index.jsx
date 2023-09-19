import PersonalStats from "@/components/stats/personal";
import { useEffect, useState } from "react";

const Stats = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);
  return (
    <div className="min-h-screen pt-10 p-8 flex flex-col">
      {user !== null && <PersonalStats />}
      {user === null && (
        <h1 className="text-text text-xl font-bold italic mt-14">
          Du må logge inn for å se personlig statistikk!
        </h1>
      )}
    </div>
  );
};

export default Stats;
