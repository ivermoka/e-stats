import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
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

  return (
    <div className={"min-h-screen flex flex-col gap-8 px-8 mb-32"}>
      <Header teamId={teamId} />
      <Members />
    </div>
  );
};

export default Lag;
