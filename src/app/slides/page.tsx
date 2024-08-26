import { SlidingCarousel } from "@/components/common/carousel";
import React from "react";

function SlidesPage() {
  return (
    <div className=" h-full  overflow-hidden">
      <div className="flex flex-col  h-full   justify-center items-center">
        <SlidingCarousel />
      </div>
    </div>
  );
}

export default SlidesPage;
