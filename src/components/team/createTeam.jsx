import React, { useState } from "react";
import { GetUser } from "@/actions/getUser";

const CreateTeam = ({setShowCreateTeam}) => {
    const [teamName, setTeamName] = useState("");
    const user = GetUser()

    const makeTeam = async (e) => {
        e.preventDefault();
        console.log(teamName);
        try {
            const res = await fetch(`/api/registerTeam`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({teamName: teamName, username: user}),
            });
            if (res.status === 200) {
                console.log("Team created");
            } else if (res.status === 500) {
                console.log("Error fetching data");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div
            className={
                "fixed h-screen w-screen bg-black/50 z-50 left-0 top-0 grid place-items-center"
            }
        >
            <form
                className={
                    "w-72 h-96 bg-primary flex flex-col gap-4 justify-center items-center rounded-lg shadow-md shadow-accent"
                }
            >
                <h1 className={"text-text text-3xl"}>Opprett Lag</h1>
                <input
                    className={"p-2 rounded-lg"}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Nytt lag"
                />
                <button
                    className={"p-2 rounded-lg text-text bg-accent text-xl font-semibold"}
                    type="submit"
                    onClick={(e) => {
                        makeTeam(e).then();
                    }}
                >
                    Opprett
                </button>
                <button
                    className={"p-2 rounded-lg text-text bg-accent text-xl font-semibold"}
                    onClick={() => setShowCreateTeam(false)}
                >
                    LUKK
                </button>
            </form>
        </div>
    );
};

export default CreateTeam;
