import { useForm } from "react-hook-form";
import Link from "next/link";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });
  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        console.log("User registered successfully");
      } else {
        const data = await response.json();
        console.error("Error registering user:", data.error);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const inputStyle = "p-2 border-bg border-2 rounded-md";
  return (
    <div className="bg-bg h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 h-3/5 bg-primary rounded-lg flex flex-col justify-center items-center gap-6"
      >
        <h1 text="Opprett bruker" />
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
        <button text="Opprett bruker" />
        <span>
          {errors.username?.message}
          <br />
          {errors.password?.message}
        </span>
        <span>
          Har allerede en bruker?{" "}
          <Link href="/login">
            <span className="text-blue-800 cursor-pointer">Logg Inn</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
