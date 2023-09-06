import Button from "./button";
import SelectGame from "./selectGame";

const EndreProfil = ({ setModalOpen, id }) => {
  const inputStyle = "border-2 border-primary rounded-lg p-1 box-border";
  return (
    <div className="mt-14 fixed top-0 left-0 h-screen w-screen p-8 flex flex-col gap-8 text-text bg-bg">
      <h2 className="font-bold text-xl italic">Endre Personlig Informasjon</h2>
      <div className="border-2 border-primary rounded-lg">
        <div className="bg-primary box-border p-4 text-3xl font-bold">{id}</div>
        <ul className="p-4 text-xl font-semibold flex flex-col gap-4">
          <li className="flex flex-col">
            <span>Brukernavn:</span> <input className={inputStyle} />{" "}
          </li>
          <li className="flex flex-col">
            <span>Spill:</span> <SelectGame className={inputStyle} />
          </li>
          <li className="flex flex-col">
            <span>Lag:</span> <input className={inputStyle} />{" "}
          </li>
          <li className="flex flex-col">
            <span>Passord:</span> <input className={inputStyle} />{" "}
          </li>
          <Button onClick={() => setModalOpen(false)} text="LAGRE" />
        </ul>
      </div>
    </div>
  );
};

export default EndreProfil;
