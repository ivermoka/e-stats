import Egenvurdering from "@/components/home/egenvurdering/egenvurdering";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Index() {
  const [storedToken, setStoredToken] = useState("");
  useEffect(() => {
    setStoredToken(localStorage.getItem("token"));
  }, []);

  const [showEgenvurdering, setShowEgenvurdering] = useState(false);
  return (
    <div className="p-4 min-h-screen">
      {!showEgenvurdering && (
        <div className="h-screen flex flex-col justify-center gap-4 break-words">
          <h1 className="text-primary font-bold text-6xl text-center">
            Velkommen til Treningsdagboka
          </h1>
          {storedToken && (
            <button
              onClick={() => setShowEgenvurdering(true)}
              className="bg-bg border-primary border-2 rounded-md p-2 text-text font-semibold text-2xl"
            >
              EGENVURDERING
            </button>
          )}
          {!storedToken && (
            <div className="flex justify-center text-text font-semibold text-lg gap-2">
              <Link href="/login">
                <button className="border-primary border-2 rounded-md p-2 w-36">
                  Logg Inn
                </button>
              </Link>
              <Link href="register">
                <button className="border-primary border-2 rounded-md p-2 w-36">
                  Registrer
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
      {showEgenvurdering && <Egenvurdering />}
    </div>
  );
}
