import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const LoginPage = () => {
  const [wrong, setWrong] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/login?username=${data.username}&password=${data.password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        window.location.href = "/";
      } else {
        setWrong(true);
        console.error("Error logging in:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const inputStyle =
    "border-b-4 border-secondary bg-transparent p-2 text-text outline-none focus:border-b-2 duration-300 w-60";
  return (
    <div className="bg-bg w-screen h-screen flex ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center p-4 gap-6"
      >
        <h1 className="text-text text-5xl m-4">Logg Inn</h1>
        <input
          {...register("username", { required: "*Skriv brukernavn" })}
          placeholder="username"
          type="text"
          className={inputStyle}
        />
        <input
          {...register("password", {
            required: "*Skriv passord",
            minLength: {
              value: 8,
              message: "*Passordet må ha minst 8 tegn",
            },
          })}
          placeholder="password"
          type="password"
          className={inputStyle}
        />
        <button className={`${inputStyle} font-semibold`}>Logg Inn</button>
        <div className="flex flex-col text-center italic text-red-900">
          <span>{errors.username?.message}</span>
          <span>{errors.password?.message}</span>
          <span>{wrong && "*Feil brukernavn eller passord"}</span>
        </div>
        <div className="text-text">
          Glemt passord?{" "}
          <Link href="/">
            <span className="text-blue-500 cursor-pointer">Bytt passord</span>
          </Link>{" "}
        </div>{" "}
        <div className="text-text">
          Har ikke bruker?{" "}
          <Link href="/register">
            <span className="text-blue-500 cursor-pointer">Opprett bruker</span>
          </Link>{" "}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
