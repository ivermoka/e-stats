import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/team/header";
import Members from "@/components/team/members";
import CreateTeam from "@/components/team/createTeam";
import { GetUser } from "@/actions/getUser";
import ReactLoading from "react-loading";
import JoinTeamPopup from "@/components/team/joinTeamPopup";

const Lag = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [team, setTeam] = useState(null);
  const url = usePathname();
  const [allMembers, setAllMembers] = useState(null);
  const user = GetUser();

  useEffect(() => {
    if (user !== null && url !== null) {
      getAllMembers().then(() => setLoaded(true));
    }
  }, [user]);

  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (allMembers) {
      if (allMembers.some((allMembers) => allMembers.username.includes(user))) {
        setIsMember(true);
      }
    }
  }, [allMembers, user]);

  useEffect(() => {
    if (typeof window !== "undefined" && url !== null) {
      const urlParts = url.split("/");
      if (urlParts.length >= 3) {
        const newId = urlParts[2];
        setTeam(newId);
        setSelectedTeam(newId);
      }
    }
  }, [url]);

  const [currentTeamCode, setCurrentTeamCode] = useState(null);
  const [showCurrentTeamCode, setShowCurrentThemeCode] = useState(false);

  const getAllMembers = async () => {
    try {
      const res = await fetch(
        `/api/getTeamMembers?team=${team}&selectedTeam=${selectedTeam}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        const data = await res.json();
        setAllMembers(data.users);
        setCurrentTeamCode(data.teamSchema.teamCode);
      } else if (res.status === 500) {
        console.log("Error fetching data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [teamCode, setTeamCode] = useState("");
  const [showCode, setShowCode] = useState(false);

  const joinTeam = async () => {
    console.log(selectedTeam);
    try {
      const res = await fetch("/api/teamPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedTeam, user, teamCode }),
      });
      if (res.status === 200) {
        window.location.reload();
        window.location.href = `/teams/${selectedTeam}`;
      } else if (res.status === 400) {
        console.log("feil kode");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const leaveTeam = async () => {
    console.log(user);
    try {
      const res = await fetch("/api/teamPage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });
      if (res.status === 200) {
        console.log("Team left");
        window.location.reload();
      } else if (res.status === 400) {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [showCreateTeam, setShowCreateTeam] = useState(false);

  const boxStyle =
    "dark:bg-primary bg-primaryLight rounded-md shadow-lg dark:shadow-accent shadow-accentLight p-4";

  return (
    <>
      {loaded ? (
        <div className={"min-h-screen flex flex-col gap-8 px-8 mb-32 mt-16"}>
          {showCode && (
            <JoinTeamPopup
              joinTeam={joinTeam}
              setTeamCode={setTeamCode}
              setShowCode={setShowCode}
            />
          )}

          <Header team={team} />
          {showCreateTeam && (
            <CreateTeam setShowCreateTeam={setShowCreateTeam} />
          )}
          <div
            className={
              "dark:border-primary border-primaryLight flex flex-col gap-6 p-4 "
            }
          >
            {currentTeamCode}
            <h2
              className={
                " dark:text-text text-textLight text-2xl px-2 font-semibold"
              }
            >
              Lagmedlemmer
            </h2>
            <div className="h-[1px] w-full dark:bg-white bg-black -mt-4"></div>
            {allMembers &&
              allMembers.map((member, index) => (
                <div key={index}>
                  <Members text={member.username} />
                </div>
              ))}
          </div>
          {isMember ? (
            <button
              type="button"
              className={`${boxStyle} text-red-400 font-semibold text-2xl`}
              onClick={() => leaveTeam()}
            >
              Forlat lag
            </button>
          ) : (
            <button
              type="button"
              className={`${boxStyle} text-blue-400 font-semibold text-2xl`}
              onClick={() => setShowCode(true)}
            >
              Bli med
            </button>
          )}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <ReactLoading color={"black"} width={100} type="spin" />
        </div>
      )}
    </>
  );
};

export default Lag;
