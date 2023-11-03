import { useState, useEffect } from "react";
import AdjustTeam from "@/components/profile/adjustTeam";
import { GetUser } from "@/actions/getUser";

const AdjustTeamPage = () => {
  const user = GetUser();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  const getUserData = async () => {
    try {
      const res = await fetch("/api/getUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
        }),
      });
      if (res.status === 200) {
        setData(await res.json());
      } else {
        console.log("not work");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <AdjustTeam data={data} user={user} />;
};

export default AdjustTeamPage;
