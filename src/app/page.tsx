"use client";
import UserBalance from "@/components/common/balance";
import FootballBets from "@/components/common/football";
import { MatchCards } from "@/components/common/match-cards";

import TrendingSection from "@/components/common/Trending";
import Image from "next/image";

const cards = [
  { content: "Card 1" },
  { content: "Card 2" },
  { content: "Card 3" },
];

export default function Home() {
  return (
    <main className=" flex flex-col gap-10 mt-3  overflow-hidden">
      <UserBalance />
      <TrendingSection />
      <FootballBets />
    </main>
  );
}
