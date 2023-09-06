import React from "react";
import Profile from "./../navbar/profile";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between w-screen h-14 p-1 bg-primary fixed">
        <a href="/" className="flex justify-center items-center ml-10">
          Home
        </a>
        <Profile />
      </nav>
    </>
  );
}
