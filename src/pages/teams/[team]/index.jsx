import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/team/header";
import Members from "@/components/team/members";

const Lag = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem("username"));
  }, []);

  const url = usePathname();
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && url !== null) {
      const urlParts = url.split("/");
      if (urlParts.length >= 3) {
        const newId = urlParts[2];
        setTeamId(newId);
      }
    }
  }, [url]);

  const [team, setTeam] = useState(null);

  useEffect(() => {
    getAllMembers().then();
  }, [user]);

  const getAllMembers = async () => {
    try {
      const res = await fetch(`/api/getTeamMembers?user=${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setTeam(data.users);
      } else if (res.status === 500) {
        console.log("Error fetching data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"min-h-screen flex flex-col gap-8 px-8 mb-32"}>
      <Header teamId={teamId} />
      {team &&
        team.map((member, index) => (
          <div key={index}>
            <Members text={member.username} />
          </div>
        ))}
    </div>
  );
};

export default Lag;
