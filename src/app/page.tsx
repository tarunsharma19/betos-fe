"use client";
import UserBalance from "@/components/common/balance";
import FootballBets from "@/components/common/football";
import { MatchCards } from "@/components/common/match-cards";

import TrendingSection from "@/components/common/Trending";
import { useKeylessAccounts } from "@/lib/core/useKeylessAccounts";
import { Unbounded } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const cards = [
  { content: "Card 1" },
  { content: "Card 2" },
  { content: "Card 3" },
];

export default function Home() {
  const navigate = useRouter();
  const { activeAccount, disconnectKeylessAccount } = useKeylessAccounts();

  useEffect(() => {
    if (!activeAccount) navigate.push("/");
  }, [activeAccount, navigate]);

  console.log("activeAccount", activeAccount);

  return (
    <main className=" flex flex-col gap-10 mt-3  overflow-hidden ">
      <UserBalance />
      <TrendingSection />
      <FootballBets />
    </main>
  );
}
