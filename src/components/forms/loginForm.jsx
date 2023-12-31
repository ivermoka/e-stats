import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import ForgotPassword from "@/components/forms/forgotPassword";
import ReactLoading from "react-loading";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const LoginPage = () => {
  const [pending, setPending] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await fetch(
        `/api/login?username=${data.username}&password=${data.password}`,
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
        window.location.href = "/";
      } else {
        setWrong(true);
        setPending(false);
        console.error("Error logging in:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  function toggleShowPassword() {
    const password = document.getElementById("passwordInput");
    if (password.type === "password") {
      password.type = "text";
      setShowPassword(true);
    } else {
      password.type = "password";
      setShowPassword(false);
    }
  }

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const inputStyle =
    "border-b-4 dark:border-primary border-secondaryLight bg-transparent p-2 dark:text-text text-textLight outline-none focus:border-b-2 duration-300 w-64";

  return (
    <div className="dark:bg-bg bg-bgLight w-screen h-screen flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center p-4 gap-6"
      >
        <h1 className="dark:text-text text-textLight text-5xl m-4">Logg Inn</h1>
        <div>
          <input
            {...register("username", { required: "*Skriv brukernavn" })}
            placeholder="Brukernavn"
            type="text"
            className={inputStyle}
          />
          <div className="w-4 h-4"></div>
        </div>
        <div className="flex">
          <input
            {...register("password", {
              required: "*Skriv passord",
              minLength: {
                value: 8,
                message: "*Passordet må ha minst 8 tegn",
              },
            })}
            placeholder="Passord"
            type="password"
            className={inputStyle}
            id="passwordInput"
          />
          {showPassword ? (
            <BiHide
              onClick={() => toggleShowPassword()}
              className="dark:text-white light:text-black text-2xl mt-2 -ml-6"
            />
          ) : (
            <BiShow
              onClick={() => toggleShowPassword()}
              className="dark:text-white light:text-black text-2xl mt-2 -ml-6"
            />
          )}
        </div>
        {pending ? (
          <ReactLoading type={"spin"} color={"black"} width={40} height={44} />
        ) : (
          <button type="submit" className={`${inputStyle} font-semibold`}>
            Logg Inn
          </button>
        )}
        <div className="flex flex-col text-center italic text-red-900">
          <span>{errors.username?.message}</span>
          <span>{errors.password?.message}</span>
          <span>{wrong && "*Feil brukernavn eller passord"}</span>
        </div>
        <div className="dark:text-text text-textLight">
          Glemt passord?{" "}
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-blue-500 cursor-pointer"
          >
            Bytt passord
          </button>
        </div>{" "}
        <div className="dark:text-text text-textLight">
          Har ikke bruker?{" "}
          <Link href="/register">
            <span className="text-blue-500 cursor-pointer">Opprett bruker</span>
          </Link>{" "}
        </div>
      </form>
      {showForgotPassword && <ForgotPassword setShow={setShowForgotPassword} />}
    </div>
  );
};

export default LoginPage;
