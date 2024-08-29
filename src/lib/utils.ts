import { type ClassValue, clsx } from "clsx";
import { Unbounded } from "next/font/google";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const unbounded = Unbounded({
  subsets: ["latin"],
});

type Bet = {
  fixture_id: string;
  odds: string;
  outcome: number;
  user: string;
  wager: string;
};

export function convertAddress(address: string) {
  // Remove leading 0 from the address if it's there
  return address.replace(/^0x0+/, "0x");
}

export function getUniqueFixtureIds(bets: Bet[]): string[] {
  const fixtureIds = bets.map((bet) => bet.fixture_id);
  return Array.from(new Set(fixtureIds));
}
