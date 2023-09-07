import Input from "./input";
import Link from "next/link";

const AboutYou = () => {
  return (
    <div className="bg-bg h-screen w-screen flex justify-center items-center flex-col gap-4 fixed top-0 left-0 z-20">
      <h2 className="font-bold text-2xl italic">Fortell oss litt om deg...</h2>
      <form className="bg-primary h-3/5 w-80 rounded-lg flex flex-col items-center gap-4 p-4 box-border">
        <Input label="Hva spiller du?" placeholder="CS:GO" />
        <Input label="Er du med på et lag?" placeholder="CS:GO" />
        <Input label="placeholder" placeholder="CS:GO" />
        <Input label="placeholder" placeholder="CS:GO" />
        <Input label="placeholder" placeholder="CS:GO" />
        <Link href="/login">
          <button
            type="submit"
            className="bg-primary border-bg border-2 rounded-md w-72 font-bold italic"
          >
            REGISTRER
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AboutYou;
