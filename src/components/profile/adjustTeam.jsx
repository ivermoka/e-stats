import { useEffect, useState } from "react";
import CreateTeam from "@/components/team/createTeam";
import Searchbar from "./../../components/team/searchBar";
import Loading from "../loading";

const AdjustTeam = ({ data, setSelectedTeam, setShowCode }) => {
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      setLoaded(true);
    }
  }, [data]);

  return (
    <>
      {loaded ? (
        <div className="h-screen w-screen dark:bg-bg/70 bg-bgLight/70 backdrop-blur-md p-8 flex flex-col gap-6 mt-14 dark:text-text text-textLight">
          {showCreateTeam && (
            <CreateTeam
              setShowCreateTeam={setShowCreateTeam}
              className="mr-7"
            />
          )}

          <Searchbar
            setSelectedTeam={setSelectedTeam}
            setShowCode={setShowCode}
          />
          <div className="h-[1px] w-4/5 bg-white"></div>
          <div className="flex justify-start w-full ">
            <span className=" text-xl">Eller</span>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateTeam(true)}
            className={
              " dark:bg-bg flex items-center justify-start rounded-2xl shadow-lg dark:shadow-accent shadow-accentLight pl-4 text-2xl border-b dark:border dark:border-white border-black h-10 font-semibold w-7/12"
            }
          >
            <span className="">Opprett lag</span>
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AdjustTeam;
