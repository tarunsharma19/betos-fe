import React from "react";
import { unbounded } from "@/app/page";
import { cn } from "@/lib/utils";
import { MatchCardsHome } from "./match-cards-home";

function FootballBets() {
  return (
    <div>
      <h1 className={cn("text-xl font-semibold mb-3", unbounded.className)}>
        Upcoming Matches
      </h1>
      <MatchCardsHome />
    </div>
  );
}

export default FootballBets;
