import PersonalStats from "@/components/stats/personal";
import { GetUser } from "@/actions/getUser";

const Stats = () => {
  const user = GetUser();
  return (
    <div className="min-h-screen w-screen overflow-x-hidden pt-10 p-8 flex flex-col dark:bg-bg bg-bgLight">
      <PersonalStats user={user} />
    </div>
  );
};

export default Stats;
