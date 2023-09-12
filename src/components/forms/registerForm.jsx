import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

const Register = ({ setRegistered }) => {
  const [userExists, setUserExists] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });
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
        console.log("User registered successfully");
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

  const inputStyle = "p-2 shadow-md shadow-bg bg-text rounded-md";
  return (
    <div className="bg-bg h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 h-3/5 bg-primary rounded-lg flex flex-col justify-center items-center gap-6 mt-12"
      >
        <h1 className="text-text text-7xl m-4 font-bold">Register</h1>
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
        <button className={`${inputStyle} font-semibold`} text="Opprett bruker">
          Opprett bruker
        </button>
        <div className="flex flex-col text-center italic text-red-900">
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
