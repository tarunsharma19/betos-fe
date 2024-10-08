import { cn, unbounded } from "@/lib/utils";
import Image from "next/image";
import React from "react";

function TrendingSection() {
  return (
    <div className="">
      <h1 className={cn("text-xl font-semibold", unbounded.className)}>
        Trending
      </h1>
      <div className="w-full h-36 mt-3">
        <Image
          src="/assets/trending-football.png"
          width={200}
          height={200}
          alt="Football Trending"
          className="w-full object-cover h-full rounded-xl"
        />
      </div>
    </div>
  );
}

export default TrendingSection;
