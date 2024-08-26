import Image from "next/image";
import React from "react";

function TrendingSection() {
  return (
    <div className="">
      <h1 className="text-xl">Trending</h1>
      <div className="w-full mt-3">
        <Image
          src="/assets/trending-football.png"
          width={200}
          height={200}
          alt="Football Trending"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}

export default TrendingSection;
