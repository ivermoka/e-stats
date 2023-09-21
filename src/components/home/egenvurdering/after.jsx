import Day from "./day";
import DisclosureMenu from "./disclosure";
import Comment from "./comment";
import React, {useState} from "react";
import {AiOutlineRollback} from "react-icons/ai";
import Link from "next/link";

const Egenvurdering = ({date, user}) => {
    const [disclosure6, setDisclosure6] = useState(0);
    const [comment, setComment] = useState("");

    const rateDay = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/registerDay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    disclosure6: disclosure6,
                    comment: comment,
                    date: date,
                    user: user,
                }),
            });
            if (res.status === 201) {
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error);
        }
    };

    const boxStyle =
        "bg-primary rounded-lg p-2 shadow-md shadow-accent font-semibold text-center text-2xl";

    return (
        <>
            <form onSubmit={rateDay} className="mb-20 xs:p-4 mt-16 overflow-x-hidden">
                <div className="flex justify-between">
                    <Day/>
                    <Link href={"/"}>
                        <div
                            className="rounded-lg text-text font-bold p-2 my-4 w-10 text-center italic bg-primary shadow-md shadow-accent">
                            <AiOutlineRollback className="w-full h-full"/>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col gap-2 bg-primary rounded-lg">
                    <DisclosureMenu
                        setDisclosure={setDisclosure6}
                        header="Hvordan spilte jeg?"
                    />
                </div>
                <Comment setComment={setComment}/>
                <button
                    type="submit"
                    className="rounded-lg bg-primary p-3 shadow-md shadow-accent text-text font-bold italic my-4"
                >
                    LAGRE
                </button>
            </form>
        </>
    );
};

export default Egenvurdering;
