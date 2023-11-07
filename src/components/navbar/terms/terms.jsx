import Disclosure from "./termsDisclosure";
import { AiOutlineRollback } from "react-icons/ai";

const Terms = ({ setShowTerms }) => {
  return (
    <div
      className={
        "z-50 fixed top-0 left-0 h-screen w-screen overflow-y-scroll dark:bg-bg/70 bg-bgLight/70 backdrop-blur-md p-8 flex flex-col text-center gap-6"
      }
    >
      <button
        type="button"
        onClick={() => setShowTerms(false)}
        className={
          "fixed right-8 grid place-items-center text-xl p-2 w-10 aspect-square rounded-lg dark:text-text text-textLight border-2 dark:border-primary border-primaryLight shadow-md shadow-accentLight dark:shadow-accent"
        }
      >
        <AiOutlineRollback />
      </button>
      <h1 className={"dark:text-text text-textLight font-bold text-4xl"}>
        Vilkår for bruk
      </h1>
      <Disclosure
        header={"Bruksvilkår"}
        text="Sist oppdatert: 19/09/2023 Disse bruksvilkårene regulerer din tilgang til og bruk av nettsiden 'navn'. Ved å bruke Nettstedet, samtykker du i å følge disse Vilkårene. Hvis du ikke godtar disse Vilkårene, vennligst avslutt bruken av Nettstedet."
      />
      <Disclosure
        header={"Din Brukerprofil"}
        text={
          "Du må opprette en brukerprofil for å bruke Nettstedet og logge spillprogresjonen din. Du er ansvarlig for å opprettholde sikkerheten for din brukerprofil og passord. Ikke del din påloggingsinformasjon med andre."
        }
      />
      <Disclosure
        header={"Treningsdagboka"}
        text={
          "Nettstedet gir deg muligheten til å logge din spillprogresjon for ulike spill. Du samtykker i å dele informasjon om din spillprogresjon med andre brukere i henhold til personvernreglene som er fastsatt på Nettstedet."
        }
      />
      <Disclosure
        header={"Opphavsrett"}
        text={
          "Du eier all informasjon og spillprogresjon du logger på Nettstedet. Nettstedets innhold, inkludert logoer, tekst, grafikk og programvare, er beskyttet av opphavsrett og andre immaterielle rettigheter. Du må ikke kopiere, distribuere eller bruke dette innholdet uten tillatelse."
        }
      />{" "}
      <Disclosure
        header={"Ansvarsfraskrivelse"}
        text={
          'Nettstedet leveres "som det er," uten garantier av noen art. Vi er ikke ansvarlige for eventuelle skader eller tap som oppstår som følge av din bruk av Nettstedet.'
        }
      />
      <Disclosure
        header={"Avslutning av konto"}
        text={
          "Vi forbeholder oss retten til å avslutte eller suspendere din brukerkonto og tilgang til Nettstedet dersom du bryter disse Vilkårene."
        }
      />
      <Disclosure
        header={"Endringer i Vilkårene"}
        text={
          "Vi kan endre disse Vilkårene når som helst. Du vil bli varslet om slike endringer, og din fortsatte bruk av Nettstedet etter slike endringer utgjør aksept av de nye Vilkårene."
        }
      />{" "}
      <Disclosure
        header={"Kontakt oss"}
        text={
          "Har du spørsmål eller bekymringer angående disse Vilkårene, kan du kontakte oss på elura001@osloskolen.no."
        }
      />
    </div>
  );
};

export default Terms;
