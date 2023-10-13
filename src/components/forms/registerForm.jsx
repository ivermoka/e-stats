import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import ReactLoading from "react-loading";

const Register = ({ setRegistered }) => {
  const [pending, setPending] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { mail: "", username: "", password: "", terms: "" },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await fetch("/api/register", {
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
        setPending(false);
        setUserExists(true);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const inputStyle =
    "border-b-4 dark:border-secondary border-secondaryLight bg-transparent p-2 dark:text-text text-textLight outline-none focus:border-b-2 duration-300 w-60";
  return (
    <div className="dark:bg-bg bg-bgLight w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg flex flex-col justify-center items-center gap-4"
      >
        <h1 className="dark:text-text text-textLight text-5xl m-4">Register</h1>
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
        <div className="flex gap-2 text-textLight dark:text-text">
          <input
            {...register("terms", {
              required: "*Du må akseptere vilkårene",
            })}
            className="h-6 w-6 rounded-full"
            type="checkbox"
          />
          <span>Jeg aksepterer vilkårene</span>
        </div>
        {pending ? (
          <ReactLoading type={"cylon"} color={"black"} width={40} />
        ) : (
          <button className={`${inputStyle} font-semibold`} type="submit">
            Opprett bruker
          </button>
        )}
        <div className="flex flex-col text-center italic text-red-900">
          <span>{errors.mail?.message}</span>
          <span>{errors.username?.message}</span>
          <span>{errors.password?.message}</span>
          <span>{errors.terms?.message}</span>
          <span>{userExists ? "*Dette brukernavnet er tatt" : null}</span>
        </div>
        <span className="dark:text-text text-textLight">
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
