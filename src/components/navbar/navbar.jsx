import { useState, useEffect } from "react";
import Link from "next/link";
import Home from "./../navbar/home";
import Stats from "./../navbar/stats";
import Profile from "./../navbar/profile";

export default function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(localStorage.getItem("username"));
    }
  }, []);
  return (
    <>
      <nav className="fixed flex justify-between items-center w-screen h-16 z-40 px-2 bottom-0 mb-4 mt-8">
        <div className="flex gap-2">
          <Link href="/">
            <div className="h-full w-16 p-2 grid place-items-center bg-primary rounded-lg shadow-md shadow-accent">
              <Home />
            </div>
          </Link>
          <Link href="/stats">
            <div className="h-full w-16 p-2 grid place-items-center bg-primary rounded-lg shadow-md shadow-accent">
              <Stats />
            </div>
          </Link>
        </div>
        {user ? (
          <Link href={`/users/${user}`}>
            <div className="h-16 w-16 p-2 grid place-items-center bg-primary rounded-lg shadow-md shadow-accent">
              <Profile />
            </div>
          </Link>
        ) : (
          <div className="h-16 w-40 p-2 flex gap-2 justify-center items-center text-text font-thin text-md">
            <Link href="/register">Registrer </Link> /
            <Link href="/login">Logg Inn</Link>
          </div>
        )}
      </nav>
    </>
  );
}
