import { useState } from "react";
import CreateTeam from "@/components/team/createTeam";
import Searchbar from "./../../components/team/searchBar";
import { BiArrowBack } from "react-icons/bi";

const AdjustTeam = ({ user, setShowTeam, data }) => {
  const [showCreateTeam, setShowCreateTeam] = useState(false);

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

  const boxStyle =
    "dark:bg-primary bg-primaryLight rounded-lg shadow-lg dark:shadow-accent shadow-accentLight p-4 text-2xl font-semibold";
  return (
    <div className="fixed  h-screen w-screen dark:bg-bg/70 bg-bgLight/70 backdrop-blur-md p-8 flex flex-col  gap-6  ">
      <div className="flex w-screen h-12 justify-start items-center ">
        <div className="w-6"></div>
        <button
          type="button"
          className="rounded-lg p-2 my-4 w-10 text-center dark:text-primary text-primaryLight shadow-md dark:shadow-accent shadow-accentLight"
          onClick={() => {
            setShowTeam(false);
          }}
        >
          <BiArrowBack className="w-full h-full dark:text-text text-textLight font-bold" />
        </button>
      </div>

      {data.team !== "Ikke valgt" ? (
        <h1 className="font-bold text-xl italic mt-2">
          Du er medlem av laget: {data.team}
        </h1>
      ) : (
        <h1 className="font-bold text-xl italic mt-2">
          Du er ikke medlem av noe lag
        </h1>
      )}

      {showCreateTeam && (
        <CreateTeam setShowCreateTeam={setShowCreateTeam} className="mr-7" />
      )}

      <Searchbar />
      <div className="h-[1px] w-4/5 bg-white"></div>
      <div className="flex justify-start w-full ">
        <span className=" text-xl">Eller</span>
      </div>

      <button
        type="button"
        onClick={() => setShowCreateTeam(true)}
        className={
          " dark:bg-bg  flex items-center justify-start rounded-2xl  shadow-lg dark:shadow-accent shadow-accentLight pl-4 text-2xl border-b dark:border dark:border-white border-black h-10 font-semibold w-7/12"
        }
      >
        <span className="">Opprett lag</span>
      </button>
      {data.team !== "Ikke valgt" && (
        <button
          type="button"
          className={`${boxStyle} text-red-400 font-semibold text-2xl`}
          onClick={() => leaveTeam()}
        >
          Forlat {data.team}?
        </button>
      )}
    </div>
  );
};

export default AdjustTeam;
