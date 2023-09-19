import Image from "next/image";
import {useEffect, useState} from "react";
import Members from "@/components/team/members";


const Header = ({ teamId }) => {
    const [user, setUser] = useState(null);
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setUser(localStorage.getItem("username"));
            getAllMembers().then();
        }
    }, []);

    const getAllMembers = async () => {
        try {
            console.log("fetch started");
            const res = await fetch(`/api/getTeamMembers?user=${user}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status === 200) {
                const data = await res.json();
                setTeam(data.users)
            } else if (res.status === 500) {
                console.log("Error fetching data");
            }
        } catch (err) {
            console.log(err);
        }
    };
  const boxStyle = "bg-primary p-2 rounded-lg shadow-md shadow-accent";
  return (
    <div className={"mt-24 flex gap-4 items-end w-full h-32 text-text"}>
      <div className={`${boxStyle} h-full aspect-square p-2`}>
        <Image
          src={"/logo.png"}
          alt={"team logo"}
          width={200}
          height={200}
          priority
        />


      </div>
      <h2 className={"text-5xl font-bold"}>wikjsfkj</h2>
        {team && team.map((user, index) => (
            <Members teamUser={user.username} key={index}/>
        ))}
    </div>
  );
};

export default Header;
