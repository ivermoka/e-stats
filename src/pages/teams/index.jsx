import { useState, useEffect } from "react";
import AdjustTeam from "@/components/profile/adjustTeam";
import { GetUser } from "@/actions/getUser";
import JoinTeamPopup from "@/components/team/joinTeamPopup";

const AdjustTeamPage = () => {
  const user = GetUser();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

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

  const [showCode, setShowCode] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const joinTeam = async () => {
    try {
      const res = await fetch("/api/teamPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedTeam, user, teamCode }),
      });
      if (res.status === 200) {
        setError("");
        window.location.reload();
        window.location.href = `/teams/${selectedTeam}`;
      } else if (res.status === 400) {
        setError("*Feil kode!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen ">
      <AdjustTeam
        data={data}
        user={user}
        setSelectedTeam={setSelectedTeam}
        setShowCode={setShowCode}
      />
      {showCode && (
        <JoinTeamPopup
          joinTeam={joinTeam}
          setShowCode={setShowCode}
          setTeamCode={setTeamCode}
          error={error}
        />
      )}
    </div>
  );
};

export default AdjustTeamPage;
