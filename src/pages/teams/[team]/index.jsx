import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/team/header";
import Members from "@/components/team/members";
import CreateTeam from "@/components/team/createTeam";
import { GetUser } from "@/actions/getUser";
import Searchbar from "@/components/team/searchbar";
import ReactLoading from "react-loading";

const Lag = () => {
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
        getAllMembers();
      }
    }
  }, [url]);

  const getAllMembers = async () => {
    try {
      const res = await fetch(`/api/getTeamMembers?team=${team}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setAllMembers(data.users);
      } else if (res.status === 500) {
        console.log("Error fetching data");
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
  const [showSearch, setShowSearch] = useState(false);

  const boxStyle =
    "dark:bg-primary bg-primaryLight rounded-lg shadow-lg dark:shadow-accent shadow-accentLight p-4";

  return (
    <>
      {loaded ? (
        <div className={"min-h-screen flex flex-col gap-8 px-8 mb-32"}>
          <div
            className={
              "mt-24 h-16 flex gap-4 text-2xl dark:text-text text-textLight font-semibold"
            }
          >
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className={`${boxStyle} w-1/2`}
            >
              Finn
            </button>
            <button
              type="button"
              onClick={() => setShowCreateTeam(true)}
              className={`${boxStyle} w-1/2`}
            >
              Opprett
            </button>
          </div>

          {showSearch && <Searchbar />}

          <Header team={team} />
          {showCreateTeam && (
            <CreateTeam setShowCreateTeam={setShowCreateTeam} />
          )}
          <div
            className={
              "dark:border-primary border-primaryLight flex flex-col gap-6 p-4 "
            }
          >
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
          {isMember && (
            <button
              type="button"
              className={`${boxStyle} text-red-400 font-semibold text-2xl`}
              onClick={() => leaveTeam()}
            >
              Forlat lag
            </button>
          )}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <ReactLoading color={"black"} width={200} type="bars" />
        </div>
      )}
    </>
  );
};

export default Lag;
