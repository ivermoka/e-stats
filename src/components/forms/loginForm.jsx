import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

// TODO: Vise error meldinger på siden hvis feil brukernavn eller passord

const LoginPage = () => {
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
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        window.location.href = "/";
      } else {
        console.error("Error logging in:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const inputStyle = "p-2 border-bg border-2 rounded-md active:text-white";
  return (
    <div className="bg-bg h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 h-3/5 bg-primary rounded-lg flex flex-col justify-center items-center gap-6 -mt-32"
      >
        <h1 className="text-text text-6xl m-4 font-bold">Logg Inn</h1>
        <input
          {...register("username", { required: "Skriv brukernavn" })}
          placeholder="username"
          type="text"
          className={inputStyle}
        />
        <input
          {...register("password", {
            required: "Skriv passord",
            minLength: {
              value: 8,
              message: "Passordet må ha minst 8 tegn",
            },
          })}
          placeholder="password"
          type="password"
          className={inputStyle}
        />
        <button className={inputStyle} text="Opprett bruker">
          Logg Inn
        </button>
        <span>
          {errors.username?.message}
          <br />
          {errors.password?.message}
        </span>
        <span>
          Har ikke bruker?{" "}
          <Link href="/register">
            <span className="text-blue-800 cursor-pointer">Opprett bruker</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;

// const [formData, setFormData] = useState({
//   username: "",
//   password: "",
// });

// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({
//     ...formData,
//     [name]: value,
//   });
// };

// const handleSubmit2 = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch(
//       `http://localhost:3000/api/login?username=${formData.username}&password=${formData.password}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.status === 200) {
//       const data = await response.json();
//       console.log("Token:", data.token, "Username:", data.username);
//       localStorage.setItem("token", data.token);
//     } else {
//       console.error("Error logging in:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//   }
// };
