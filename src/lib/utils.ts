import { type ClassValue, clsx } from "clsx";
import { Unbounded } from "next/font/google";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const unbounded = Unbounded({
  subsets: ["latin"],
});
