"use client";
import { useEffect, useState } from "react";
import GoogleLogo from "@/components/logo/Google";
import { GOOGLE_CLIENT_ID } from "@/lib/core/constants";
import useEphemeralKeyPair from "@/lib/core/useEphemeralKeyPair";

function LoginPage() {
  const ephemeralKeyPair = useEphemeralKeyPair();
  const [redirectUrl, setRedirectUrl] = useState<string>("");

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      const searchParams = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: `${window.location.origin}/callback`,
        response_type: "id_token",
        scope: "openid email profile",
        nonce: ephemeralKeyPair.nonce,
      });
      url.search = searchParams.toString();
      setRedirectUrl(url.toString());
    }
  }, [ephemeralKeyPair.nonce]);

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome to Betos</h1>
        <p className="text-lg mb-8">
          Sign in with your Google account to continue
        </p>
        {redirectUrl && (
          <a
            href={redirectUrl}
            className="flex justify-center items-center border rounded-lg px-8 py-2 hover:bg-gray-100 hover:shadow-sm active:bg-gray-50 active:scale-95 transition-all"
          >
            <GoogleLogo />
            Sign in with Google
          </a>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
