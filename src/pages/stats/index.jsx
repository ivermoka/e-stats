import PersonalStats from "@/components/stats/personal";
import { GetUser } from "@/actions/getUser";

const Stats = () => {
  const user = GetUser();
  return (
    <div className="min-h-screen w-screen pt-10 p-8 flex flex-col dark:bg-bg bg-bgLight">
      {user !== "" ? (
        <PersonalStats user={user} />
      ) : (
        <h1 className="dark:text-text text-textLight text-xl font-bold italic mt-14">
          Du må logge inn for å se personlig statistikk!
        </h1>
      )}
    </div>
  );
};

export default Stats;
