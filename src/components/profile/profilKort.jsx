import {motion} from "framer-motion";
import Image from "next/image";
import {useEffect, useState} from "react";
import {AiFillFire} from "react-icons/ai";

const ProfilKort = ({id}) => {
    const [profilePicture, setProfilePicture] = useState("/logo.png");
    const [user, setUser] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        setUser(localStorage.getItem("username"));
        getUser()
    }, [user]);
    const getUser = async () => {
        try {
            const res = await fetch("/api/getUser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user,
                }),
            });

            if (res.status === 200) {
                setData(await res.json());
            }
        } catch (error) {
            console.log(error);
        }
    };
    const boxStyle = "bg-primary p-4 rounded-lg shadow-md shadow-accent";
    return (
        <motion.div
            initial={{x: 200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                type: "spring",
                delay: 0.2,
            }}
        >
            <div className="box-border p-4 text-3xl font-bold flex gap-2">
                <div className={`bg-primary rounded-full shadow-md shadow-accent w-24`}>
                    <Image
                        src={profilePicture}
                        alt="profile picture"
                        width={200}
                        height={200}
                    />
                </div>
                <div className={`${boxStyle} text-center w-full flex`}>{id}</div>
            </div>
            <ul className="p-4 text-xl font-semibold flex flex-col gap-4">
                <li className={`${boxStyle}`}>Skole: {data.school}</li>
                <li className={`${boxStyle}`}>Lag: {data.team}</li>
            </ul>
        </motion.div>
    );
};

export default ProfilKort;
