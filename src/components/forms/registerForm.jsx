import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

const Register = ({ setRegistered }) => {
  const [userExists, setUserExists] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { mail: "", username: "", password: "" } });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        const data = await response.json();
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", data.token);
        setRegistered(true);
      } else {
        setUserExists(true);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const inputStyle =
    "border-b-4 border-secondary bg-transparent p-2 text-text outline-none focus:border-b-2 duration-300 w-60";
  return (
    <div className="bg-bg w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg flex flex-col justify-center items-center gap-4"
      >
        <h1 className="text-text text-5xl m-4">Register</h1>
        <input
          {...register("mail", { required: "*Skriv mail" })}
          placeholder="mail"
          type="email"
          className={inputStyle}
        />
        <input
          {...register("username", {
            required: "*Skriv brukernavn",
            minLength: {
              value: 3,
              message: "*Brukernavn må ha minst 3 tegn",
            },
          })}
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
        <button className={`${inputStyle} font-semibold`} text="Opprett bruker">
          Opprett bruker
        </button>
        <div className="flex flex-col text-center italic text-red-900">
          <span>{errors.mail?.message}</span>
          <span>{errors.username?.message}</span>
          <span>{errors.password?.message}</span>
          <span>{userExists ? "*Dette brukernavnet er tatt :(" : null}</span>
        </div>
        <span className="text-text">
          Har allerede en bruker?{" "}
          <Link href="/login">
            <span className="text-blue-500 cursor-pointer">Logg Inn</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
