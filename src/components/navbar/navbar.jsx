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
      <nav className="fixed flex justify-between items-center w-screen h-16 border-2 bg-bg border-b-primary border-transparent z-40">
        <div className="flex">
          <Link href="/">
            <div className="h-full w-16 p-2 border-r-2 border-r-primary grid place-items-center">
              <Home />
            </div>
          </Link>
          <Link href="/stats">
            <div className="h-full w-16 p-2 border-r-2 border-r-primary grid place-items-center">
              <Stats />
            </div>
          </Link>
        </div>
        {user ? (
          <Link href={`/users/${user}`}>
            <div className="h-16 w-16 p-2 border-l-2 border-l-primary grid place-items-center">
              <Profile />
            </div>
          </Link>
        ) : (
          <div className="h-16 w-40 p-2 border-l-2 border-l-primary flex gap-2 justify-center items-center text-primary font-thin text-sm">
            <Link href="/register">Registrer </Link> /
            <Link href="/login">Logg Inn</Link>
          </div>
        )}
      </nav>
    </>
  );
}
