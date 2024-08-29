"use client";
import { useKeylessAccount } from "@/contexts/keyless-contect";
import { aptos, ephemeralKeyPair } from "@/lib/aptos";
import { useKeylessAccounts } from "@/lib/core/useKeylessAccounts";
import { Aptos, AptosConfig, KeylessAccount } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import { jwtDecode } from 'jwt-decode';


function CallbackPage() {
  const isLoading = useRef(false);
  const switchKeylessAccount = useKeylessAccounts(
    (state: any) => state.switchKeylessAccount
  );
  const navigate = useRouter();
  const [idToken, setIdToken] = useState<string | null>(null);
  const { keylessAcc, setKeylessAcc } = useKeylessAccount();
  
  
  useEffect(() => {
    // Ensure this code only runs on the client side
    if (typeof window !== "undefined") {
      const fragmentParams = new URLSearchParams(
        window.location.hash.substring(1)
      );
      const token = fragmentParams.get("id_token");
      setIdToken(token);
    }
  }, []);

  useEffect(() => {
    if (isLoading.current || !idToken) return;
    localStorage.setItem("idToken",idToken);
    isLoading.current = true;

    const payload = jwtDecode<{ nonce: string }>(idToken);
    const jwtNonce = payload.nonce;
    const ekp = JSON.parse(localStorage.getItem("ekp")!);
 
    // Validate the EphemeralKeyPair
    // if (!ekp || ekp.nonce !== jwtNonce || ekp.isExpired() ) {
    //   throw new Error("Ephemeral key pair not found or expired");
    // }

    // const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET })); // Configure your network here
    aptos.deriveKeylessAccount({
        jwt:idToken,
        ephemeralKeyPair,
    }).then((res)=>{
        setKeylessAcc(res)
    });



    async function deriveAccount(idToken: string) {
      try {
        await switchKeylessAccount(idToken);
        navigate.push("/");
      } catch (error) {
        navigate.push("/");
      }
    }

    if (!idToken) {
      navigate.push("/");
      return;
    }

    deriveAccount(idToken);
  }, [idToken, navigate, switchKeylessAccount]);

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="relative flex justify-center items-center border rounded-lg px-8 py-2 shadow-sm cursor-not-allowed tracking-wider">
        <span className="absolute flex h-3 w-3 -top-1 -right-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        Your account is being derived...
      </div>
    </div>
  );
}

export default CallbackPage;
