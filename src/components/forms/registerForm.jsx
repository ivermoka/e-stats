import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import ReactLoading from "react-loading";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const Register = ({ setRegistered }) => {
  const [pending, setPending] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);

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
    if (data.password === data.confirmPassword) {
      setPasswordsDontMatch(false);
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
          localStorage.setItem("token", data.token);
          setRegistered(true);
        } else {
          setPending(false);
          setUserExists(true);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      setPasswordsDontMatch(true);
      setPending(false);
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

  function toggleShowConfirmPassword() {
    const confirmPassword = document.getElementById("confirmPasswordInput");
    if (confirmPassword.type === "password") {
      confirmPassword.type = "text";
      setShowConfirmPassword(true);
    } else {
      confirmPassword.type = "password";
      setShowConfirmPassword(false);
    }
  }
  const inputStyle =
    "border-b-4 dark:border-primary border-secondaryLight bg-transparent p-2 dark:text-text text-textLight outline-none focus:border-b-2 duration-300 w-64";
  return (
    <div className="dark:bg-bg bg-bgLight w-screen h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg flex flex-col justify-center items-center gap-4"
      >
        <h1 className="dark:text-text text-textLight text-5xl m-4">Register</h1>
        <div className="flex">
          {/* Denne boksen trengs fordi man ikke kan ha elementer inne i inputs. */}
          {/*implementa -ml-6 i stedet for å kunne beholde animasjoner for input fields, det er fortsatt scaleable, beholdte boksen med flex for å ha øye på samme linje*/}
          <input
            {...register("mail", { required: "*Skriv mail" })}
            placeholder="mail"
            type="email"
            className={inputStyle}
          />
        </div>

        <div className="flex">
          <input
            {...register("username", {
              required: "*Skriv brukernavn",
              minLength: {
                value: 3,
                message: "*Brukernavn må ha minst 3 tegn",
              },
            })}
            placeholder="brukernavn"
            type="text"
            className={inputStyle}
          />
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
            placeholder="passord"
            type="password"
            id="passwordInput"
            className={inputStyle}
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
        <div className="flex">
          <input
            {...register("confirmPassword")}
            placeholder="bekreft passord"
            type="password"
            id="confirmPasswordInput"
            className={inputStyle}
          />
          {showConfirmPassword ? (
            <BiHide
              onClick={() => toggleShowConfirmPassword()}
              className="dark:text-white light:text-black text-2xl mt-2 -ml-6"
            />
          ) : (
            <BiShow
              onClick={() => toggleShowConfirmPassword()}
              className="dark:text-white light:text-black text-2xl mt-2 -ml-6"
            />
          )}
        </div>
        <div className="flex gap-2 text-textLight dark:text-text">
          <input
            {...register("terms", {
              required: "*Du må akseptere vilkårene",
            })}
            className="h-6 w-5"
            type="checkbox"
          />
          <span>Jeg aksepterer vilkårene</span>
        </div>
        {pending ? (
          <ReactLoading type={"spin"} color={"black"} width={40} height={44} />
        ) : (
          <button className={`${inputStyle} font-semibold`} type="submit">
            Opprett bruker
          </button>
        )}
        <div className="flex flex-col text-center italic text-red-900">
          <span>{errors.mail?.message}</span>
          <span>{errors.username?.message}</span>
          <span>{errors.password?.message}</span>
          <span>{passwordsDontMatch ? "*Passordene matcher ikke" : null}</span>
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
