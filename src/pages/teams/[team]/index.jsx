import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/team/header";
import Members from "@/components/team/members";
import CreateTeam from "@/components/team/createTeam";
import { GetUser } from "@/actions/getUser";
import JoinTeamPopup from "@/components/team/joinTeamPopup";
import Loading from "@/components/loading";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const Lag = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [team, setTeam] = useState(null);
  const url = usePathname();
  const [allMembers, setAllMembers] = useState(null);
  const user = GetUser();
  const [error, setError] = useState("");
  const [ShowTeamCode, setShowTeamCode] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

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
  const [isLeader, setIsLeader] = useState(false);

  const getAllMembers = async () => {
    try {
      const res = await fetch(
        `/api/getTeamMembers?team=${team}&selectedTeam=${selectedTeam}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        setAllMembers(data.users);
        setCurrentTeamCode(data.teamSchema.teamCode);
        const leader = data.teamSchema.leader;
        if (leader === user) {
          setIsLeader(true);
        }
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

  const leaveTeam = async () => {
    try {
      const res = await fetch("/api/teamPage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });
      if (res.status === 200) {
        window.location.href = "/";
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

  function showBiHideIcon() {
    setShowIcon(false);
    setShowTeamCode((y) => !y);
  }
  function showBiShowIcon() {
    setShowIcon(true);
    setShowTeamCode((y) => !y);
  }
  return (
    <div className="dark:bg-bg bg-bgLight min-h-screen">
      {loaded ? (
        <div className={"flex flex-col gap-8 px-8 mt-16"}>
          {showCode && (
            <JoinTeamPopup
              joinTeam={joinTeam}
              setTeamCode={setTeamCode}
              setShowCode={setShowCode}
              error={error}
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
            {isLeader && (
              <div className="flex items-center justify-between">
                <button
                  className="dark:text-white text-black text-xl"
                  onClick={() => setShowTeamCode((x) => !x)}
                >
                  lagkode
                </button>

                {ShowTeamCode ? (
                  <span className="text-red-400 text-xl">
                    {currentTeamCode}{" "}
                  </span>
                ) : null}
                <div className="w-24"></div>
                {showIcon ? (
                  <BiHide
                    onClick={() => showBiHideIcon()}
                    className="dark:text-white light:text-black text-3xl "
                  />
                ) : (
                  <BiShow
                    onClick={() => showBiShowIcon()}
                    className="dark:text-white light:text-black text-3xl "
                  />
                )}
              </div>
            )}

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
              className={`${boxStyle} text-red-400 font-semibold text-2xl mb-28`}
              onClick={() => leaveTeam()}
            >
              Forlat lag
            </button>
          ) : (
            <button
              type="button"
              className={`${boxStyle} text-blue-400 font-semibold text-2xl mb-28`}
              onClick={() => setShowCode(true)}
            >
              Bli med
            </button>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Lag;
