"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../ui/card";

export function MatchCards() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: "60px",
    gap: 10,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "20px",
        },
      },
    ],
  };
  return (
    <div className="">
      <Slider {...settings} className="">
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="px-1" key={i}>
            <Card className="bg-white p-6  rounded-2xl h-52">
              Slide 1 Content
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
