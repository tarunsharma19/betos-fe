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
      away: "Manchester United",
      homeLogo: "/assets/team1.png",
      awayLogo: "/assets/team2.png",
    },
  ];
  return (
    <div className="">
      <Slider {...settings} className="">
        {teams.map((machup, i) => (
          <div className="px-1 " key={i}>
            <Card className="bg-white p-6  rounded-2xl h-48 flex flex-col justify-between ">
              <div className="grid grid-cols-5 w-full ">
                <div className=""></div>
                <TeamCardHome
                  teamName={machup.home}
                  teamLogo={machup.homeLogo}
                />
                <div className="flex justify-center h-auto items-center aspect-square">
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
              <hr className="my-3" />
              <div className="flex justify-center items-center w-full">
                <div className="grid grid-cols-3 gap-2  flex-grow">
                  <Badge
                    className="border rounded-full w-full flex justify-center py-1 bg-green-500"
                    variant={"outline"}
                  >
                    1.03
                  </Badge>
                  <Badge
                    className="border rounded-full w-full flex justify-center py-1 bg-yellow-500"
                    variant={"outline"}
                  >
                    4.03
                  </Badge>
                  <Badge
                    className="border rounded-full w-full flex justify-center py-1 bg-blue-500"
                    variant={"outline"}
                  >
                    2.03
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
