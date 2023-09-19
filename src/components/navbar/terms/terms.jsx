import Disclosure from "./termsDisclosure";

const Terms = ({ setShowTerms }) => {
  return (
    <div
      className={
        "fixed top-0 left-0 h-screen w-screen bg-bg/70 backdrop-blur-md p-8 flex flex-col text-center items-center justify-center gap-4 overflow-y-scroll"
      }
    >
      <h1 className={"text-text font-bold text-4xl"}>
        Vilkår for bruk av Treningsdagboka
      </h1>
      <Disclosure
        header={"Om Dagboka"}
        text={
          "'Navn' er et verktøy for notering av økter man har utført og for å se statistikk for tidligere økter."
        }
      />
      <Disclosure
        header={"Registrering"}
        text={
          "Du må registrere deg i systemet for å kunne logge økter og se statistikk. Du trenger kun å oppgi brukernavn, passord og mail for å kunne kontakte deg eller endre passord. Vi selger ikke informasjonen din trust."
        }
      />
      <Disclosure
        header={"Admin kontoer"}
        text={
          "Admin kontoer skal har tilgang til informasjon på alle brukere for skole/laget sitt og vil kunne se statistikk til alle brukere i skolen/laget. Admin brukere er bare gitt ut til lærere/trenere."
        }
      />
      <button
        onClick={() => setShowTerms(false)}
        className={
          "text-2xl text-text font-semibold rounded-lg shadow-md shadow-accent bg-primary px-4 py-2"
        }
      >
        Lukk
      </button>
    </div>
  );
};

export default Terms;
