import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Header from "@/components/team/header";
import Members from "@/components/team/members";
import CreateTeam from "@/components/team/createTeam";

const Lag = () => {
    const [team, setTeam] = useState(null);
    const url = usePathname();
    const [teamId, setTeamId] = useState(null);
    const [allMembers, setAllMembers] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            if (localStorage.getItem("username") !== null) {
                getAllMembers().then();
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && url !== null) {
            const urlParts = url.split("/");
            if (urlParts.length >= 3) {
                const newId = urlParts[2];
                setTeamId(newId);
            }
        }
    }, [url]);


    const getAllMembers = async () => {
        try {
            const res = await fetch(`/api/getTeamMembers?user=${localStorage.getItem("username")}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status === 200) {
                const data = await res.json();
                setAllMembers(data.users);
                setTeam(data.userTeam)
            } else if (res.status === 500) {
                console.log("Error fetching data");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [showCreateTeam, setShowCreateTeam] = useState(false);

    const boxStyle = "bg-primary rounded-lg shadow-lg shadow-accent p-4";

    return (
        <div className={"min-h-screen flex flex-col gap-8 px-8 mb-32"}>
            <div className={"mt-24 h-16 flex gap-4 text-2xl text-text font-semibold"}>
                <button className={`${boxStyle} w-1/2`}>Finn</button>
                <button
                    onClick={() => setShowCreateTeam(true)}
                    className={`${boxStyle} w-1/2`}
                >
                    Opprett
                </button>
            </div>

            <Header team={team}/>
            {showCreateTeam && <CreateTeam setShowCreateTeam={setShowCreateTeam}/>}
            <div
                className={"border-primary border-4 flex flex-col gap-8 p-4 rounded-lg"}
            >
                <h2
                    className={
                        "bg-bg text-text absolute -mt-9 text-2xl px-2 font-semibold"
                    }
                >
                    Lagmedlemmer
                </h2>
                {allMembers &&
                    allMembers.map((member, index) => (
                        <div key={index}>
                            <Members text={member.username}/>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Lag;
