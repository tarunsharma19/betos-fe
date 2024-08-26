import React from "react";
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

function MobileNavigation() {
  return (
    <div className="fixed bottom-3 mb-3  w-screen z-10">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl px-5">
        <div className="h-14 w-full bg-black flex aspect-square cursor-pointer items-center justify-around rounded-full ">
          {DATA.navbar.map((item: any, index) => (
            <Link key={index} href={item.href} className="text-white text-sm">
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileNavigation;
