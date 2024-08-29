"use client";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Dock, DockIcon } from "../magicui/dock";
import { DATA } from "./icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { useKeylessAccounts } from "@/lib/core/useKeylessAccounts";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { GOOGLE_CLIENT_ID } from "@/lib/core/constants";
import useEphemeralKeyPair from "@/lib/core/useEphemeralKeyPair";
import GoogleLogo from "../logo/Google";
import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import { WalletName } from "@aptos-labs/wallet-adapter-react";
import { usePathname } from "next/navigation";

function MobileNavigation() {
  const { activeAccount } = useKeylessAccounts();
  const { connected, handleConnect, walletName, account, isLoading } =
    useAptosWallet();

  const location = usePathname();

  if (!activeAccount && !connected && location !== "/callback")
    return <DrawerDemo isLoading={isLoading} />;

  return (
    <div className="">
      {location !== "/callback" && (
        <div className="fixed bottom-3 mb-3 w-screen z-10 bg-transparent max-w-[600px]">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent  px-5 bg-transparent">
            <div className="h-14 w-full bg-black flex aspect-square cursor-pointer items-center justify-around rounded-2xl ">
              {DATA.navbar.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-white text-sm"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNavigation;

export function DrawerDemo({ isLoading }: { isLoading: boolean }) {
  const [open, setOpen] = useState(false);
  const ephemeralKeyPair = useEphemeralKeyPair();
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const { handleConnect } = useAptosWallet();

  const location = usePathname();

  useEffect(() => {
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
  }, [ephemeralKeyPair.nonce]);

  useEffect(() => {
    // if not authenticated with Google and not connected with Aptos, open the drawer
    if (!open && !redirectUrl) {
      setOpen(true);
    }

    // if authenticated with Google or connected with Aptos, close the drawer
    if (open && redirectUrl) {
      setOpen(false);
    }

    if (location === "/callback") {
      setOpen(false);
    }
  }, [location, open, redirectUrl]);

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <DrawerTrigger asChild>
        <div className="fixed bottom-3 w-screen px-2 z-10 max-w-[600px]">
          <Button
            variant="default"
            onClick={() => setOpen(true)}
            className="w-full rounded-2xl"
          >
            Get Started
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex items-center justify-center h-56 px-4">
          {isLoading === true ? (
            <div>Your account details are being fetched!</div>
          ) : (
            <div>
              <p className="text-lg mb-8 text-center">
                Get started with Betos by connecting your wallet
              </p>
              {redirectUrl && (
                <Link
                  href={redirectUrl}
                  className="flex justify-center items-center border px-8 py-2 hover:bg-gray-100 hover:shadow-sm active:bg-gray-50 active:scale-95 transition-all rounded-full"
                >
                  <GoogleLogo />
                  Sign in with Google
                </Link>
              )}
              <Button
                className="w-full rounded-full mt-3"
                variant="default"
                onClick={() => handleConnect("Petra" as WalletName<"Petra">)}
              >
                Connect Aptos Wallet
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
