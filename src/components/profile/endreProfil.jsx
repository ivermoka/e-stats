import Button from "./button";

const EndreProfil = ({ setModalOpen, id }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen p-8 flex flex-col gap-8 text-text bg-bg">
      <h2 className="font-bold text-xl italic">Endre Personlig Informasjon</h2>
      <div className="border-2 border-primary rounded-lg">
        <div className="bg-primary box-border p-4 text-3xl font-bold">{id}</div>
        <ul className="p-4 text-xl font-semibold flex flex-col gap-2">
          <li className="flex flex-col">
            <span>Brukernavn:</span> <input />{" "}
          </li>
          <li className="flex flex-col">
            <span>Spill:</span> <input />{" "}
          </li>
          <li className="flex flex-col">
            <span>Lag:</span> <input />{" "}
          </li>
          <li className="flex flex-col">
            <span>Passord:</span> <input />{" "}
          </li>
          <Button onClick={() => setModalOpen(false)} text="LAGRE" />
        </ul>
      </div>
    </div>
  );
};

export default EndreProfil;
