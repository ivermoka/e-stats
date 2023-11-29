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
        <div className="h-screen w-screen p-8 flex flex-col gap-6 mt-14 dark:text-text text-textLight">
          {showCreateTeam && (
            <CreateTeam setShowCreateTeam={setShowCreateTeam} />
          )}

          <Searchbar
            setSelectedTeam={setSelectedTeam}
            setShowCode={setShowCode}
          />
          <div className="h-[1px] w-full dark:bg-primary bg-primaryLight"></div>

          <button
            type="button"
            onClick={() => setShowCreateTeam(true)}
            className={
              "flex items-center justify-start rounded-md p-3 w-48 text-2xl h-10 font-semibold border dark:border-primary border-primaryLight text-center"
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
