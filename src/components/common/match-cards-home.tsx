"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../ui/card";
import { TeamCard } from "./carousel";
import Image from "next/image";
import { TeamCardHome } from "./team-card-home";
import { Badge } from "../ui/badge";
import { WinningStats } from "./winning-stats";
import { WinningStatsHome } from "./winning-stats-home";
import { cn, unbounded } from "@/lib/utils";

export function MatchCardsHome() {
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

  const teams = [
    {
      home: "Chelsea",
      away: "Arsenal",
      homeLogo: "/assets/team1.png",
      awayLogo: "/assets/team2.png",
    },
    {
      home: "Liverpool",
      away: "Big Blues",
      homeLogo: "/assets/team1.png",
      awayLogo: "/assets/team2.png",
    },
  ];
  return (
    <div className="">
      <Slider {...settings} className="">
        {teams.map((machup, i) => (
          <div className="px-1 " key={i}>
            <Card className="bg-white p-3  rounded-2xl h-48 flex flex-col justify-between ">
              <div className="grid grid-cols-5 w-full ">
                <div className=""></div>
                <TeamCardHome
                  teamName={machup.home}
                  teamLogo={machup.homeLogo}
                />
                <div className="flex justify-center  p-3 items-center h-16">
                  <Image
                    src={"/assets/vs.png"}
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                    alt="VS"
                  />
                </div>
                <TeamCardHome
                  teamName={machup.away}
                  teamLogo={machup.awayLogo}
                />
              </div>
              <hr className="my-2" />
              <h6
                className={cn(
                  " text-sm mb-1 font-semibold ",
                  unbounded.className
                )}
              >
                Winning Percentage:
              </h6>
              <WinningStatsHome home={15} draw={35} away={65} />
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
