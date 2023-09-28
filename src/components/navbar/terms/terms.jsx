import Disclosure from "./termsDisclosure";

const Terms = ({ setShowTerms }) => {
  return (
    <div
      className={
        "fixed top-0 left-0 h-screen w-screen overflow-y-scroll dark:bg-bg/70 bg-bgLight/70 backdrop-blur-md p-8 flex flex-col text-center gap-6"
      }
    >
      <h1 className={"dark:text-text text-textLight font-bold text-4xl"}>
        Vilkår for bruk av Treningsdagboka
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
      <button
        onClick={() => setShowTerms(false)}
        className={
          "text-2xl dark:text-text text-textLight font-semibold rounded-lg shadow-md dark:shadow-accent shadow-accentLight dark:bg-primary bg-primaryLight px-4 py-2"
        }
      >
        Lukk
      </button>
    </div>
  );
};

export default Terms;
