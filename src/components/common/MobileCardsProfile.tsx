"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../ui/card";
import { TeamCard } from "./carousel";
import Image from "next/image";

export function MatchCardsProfile({ combinedData }: { combinedData: any }) {
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
    // Add more matchups here
  ];

  console.log(combinedData);

  return (
    <div className="">
      <Slider {...settings} className="">
        {combinedData?.map((machup: any, i: any) => (
          <div className="px-1" key={i}>
            <Card className="bg-white p-6  rounded-2xl h-52">
              <h2 className="text-center w-full">
                {machup.fixtureData.fixture.date}
              </h2>
              <div className="grid grid-cols-3 w-full ">
                <TeamCard
                  teamName={machup.fixtureData.teams.home.name}
                  teamLogo={machup.fixtureData.teams.home.logo}
                />
                <div className="flex justify-center h-auto items-center aspect-square">
                  <Image
                    src={"/assets/vs.png"}
                    width={40}
                    height={40}
                    alt="VS"
                  />
                </div>
                <TeamCard
                  teamName={machup.fixtureData.teams.away.name}
                  teamLogo={machup.fixtureData.teams.away.logo}
                />
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
