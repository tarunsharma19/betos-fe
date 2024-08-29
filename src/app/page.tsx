"use client";
import UserBalance from "@/components/common/balance";
import FootballBets from "@/components/common/football";
import { MatchCards } from "@/components/common/match-cards";

import TrendingSection from "@/components/common/Trending";
import { Button } from "@/components/ui/button";
import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import { aptos, getBalance } from "@/lib/aptos";
import { useKeylessAccounts } from "@/lib/core/useKeylessAccounts";
import { cn, unbounded } from "@/lib/utils";
import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { Unbounded } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const cards = [
  { content: "Card 1" },
  { content: "Card 2" },
  { content: "Card 3" },
];

export default function Home() {
  const navigate = useRouter();
  const { activeAccount } = useKeylessAccounts();
  const { account } = useAptosWallet();
  const [accountAddress, setAccountAddress] = useState<any>();
  const [balance, setBalance] = useState<any>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeAccount?.accountAddress) {
      setAccountAddress(activeAccount?.accountAddress);
    } else if (account?.address) {
      setAccountAddress(account?.address);
    }
  }, [activeAccount, account]);

  useEffect(() => {
    if (!activeAccount) navigate.push("/");
  }, [activeAccount, navigate]);

  console.log("activeAccount", activeAccount);

  const [firstTimeUser, setFirstTimeUser] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get("xnbx-auth");
    if (!cookie) {
      setFirstTimeUser(true);
    }
  }, []);

  let pk = new Ed25519PrivateKey(process.env.NEXT_PUBLIC_PRIVATE_KEY!);
  const alice = Account.fromPrivateKey({ privateKey: pk });

  const fundacc = async () => {
    setLoading(true);
    console.log("called");
    const transaction = await aptos.transferCoinTransaction({
      sender: alice.accountAddress,
      recipient: accountAddress,
      amount: 1_000_000,
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({
      signer: alice,
      transaction,
    });

    getBalance(accountAddress).then((res) => {
      setBalance(res / 10 ** 8);
    });

    setLoading(false);

    toast.success("Funds Claimed Successfully", {
      description: "You have successfully claimed 1$ APT",
    });

    Cookies.set("xnbx-auth", "true");
    setFirstTimeUser(false);
    console.log("sent to", accountAddress, "\n", pendingTxn);
  };

  return (
    <main className=" flex flex-col gap-10 mt-3  overflow-hidden ">
      <UserBalance />
      {firstTimeUser && (
        <div className="">
          <h1 className={cn("text-xl font-semibold", unbounded.className)}>
            Claim Funds
          </h1>
          <div className=" flex h-36 p-4 w-full mt-3 bg-white justify-between items-end rounded-2xl  border-2 border-black">
            <p className={cn("text-xl font-semibold ", unbounded.className)}>
              First <br />
              Bet is on Us <br />
              Claim 1 $APT to <br />
              get Started
            </p>
            <Button className="rounded-xl" onClick={fundacc}>
              {loading ? "Claiming..." : "Claim"}
            </Button>
          </div>
        </div>
      )}

      <TrendingSection />
      <FootballBets />
    </main>
  );
}
