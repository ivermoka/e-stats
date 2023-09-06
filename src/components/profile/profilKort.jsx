import Button from "./button";

const ProfilKort = ({ setModalOpen, id }) => {
  return (
    <div className="border-2 border-primary rounded-lg">
      <div className="bg-primary box-border p-4 text-3xl font-bold">{id}</div>
      <ul className="p-4 text-xl font-semibold flex flex-col gap-2">
        <li>Brukernavn: </li>
        <li>Spill: </li>
        <li>Lag: </li>
        <li>Passord: ****</li>
        <Button onClick={() => setModalOpen(true)} text="ENDRE" />
      </ul>
    </div>
  );
};

export default ProfilKort;
