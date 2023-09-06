import { useState } from "react";
import RegisterForm from "../../components/forms/registerForm";
import AboutYou from "@/components/aboutyou/aboutyou";

const Registerpage = () => {
  const [registered, setRegistered] = useState(false);
  return (
    <>
      <RegisterForm setRegistered={setRegistered} />
      {registered && <AboutYou />}
    </>
  );
};

export default Registerpage;
