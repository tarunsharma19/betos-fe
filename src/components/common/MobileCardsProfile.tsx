"use client";

import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../ui/card";
import { TeamCard } from "./carousel";
import Image from "next/image";
import { formatUtcDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

export function MatchCardsProfile({ combinedData }: { combinedData: any }) {
  const settings = {
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

  const formatOutcome = (outcome: number) => {
    switch (outcome) {
      case 0:
        return "Home";
      case 1:
        return "Away";
      case 2:
        return "Draw";
      default:
        return "";
    }
  };

  const groupedBets = useMemo(() => {
    const filteredData = combinedData.filter(
      (data: any) => Object.keys(data.fixtureData).length !== 0
    );

    const grouped = filteredData.reduce((acc: any, bet: any) => {
      const key = `${bet.fixture_id}-${bet.outcome}`;
      if (!acc[key]) {
        acc[key] = {
          fixture_id: bet.fixture_id,
          odds: bet.odds,
          outcome: bet.outcome,
          user: bet.user,
          wager: parseInt(bet.wager, 10),
          fixtureData: bet.fixtureData,
        };
      } else {
        acc[key].wager += parseInt(bet.wager, 10);
      }
      return acc;
    }, {});

    return Object.values(grouped);
  }, [combinedData]);

  return (
    <div className="">
      {groupedBets.length === 1 ? (
        groupedBets.map((matchup: any, i: number) => (
          <div className="px-1" key={i}>
            <Card className="bg-white p-6 rounded-2xl h-52">
              <div className="flex justify-center mb-2">
                <Badge className="text-center" variant={"secondary"}>
                  {formatUtcDate(matchup.fixtureData?.fixture?.date)}
                </Badge>
              </div>
              <div className="grid grid-cols-3 w-full">
                <TeamCard
                  teamName={matchup.fixtureData?.teams?.home.name}
                  teamLogo={matchup.fixtureData?.teams?.home.logo}
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
                  teamName={matchup.fixtureData?.teams?.away.name}
                  teamLogo={matchup.fixtureData?.teams?.away.logo}
                />
              </div>
              <h2 className="text-center">
                Betted on {formatOutcome(matchup.outcome)}
              </h2>
            </Card>
          </div>
        ))
      ) : (
        <Slider {...settings} className="">
          {groupedBets.map((matchup: any, i: number) => (
            <div className="px-1" key={i}>
              <Card className="bg-white p-6 rounded-2xl h-56">
                <div className="flex justify-center mb-2">
                  <Badge className="text-center" variant={"secondary"}>
                    {formatUtcDate(matchup.fixtureData?.fixture?.date)}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 w-full">
                  <TeamCard
                    teamName={matchup.fixtureData?.teams?.home.name}
                    teamLogo={matchup.fixtureData?.teams?.home.logo}
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
                    teamName={matchup.fixtureData?.teams?.away.name}
                    teamLogo={matchup.fixtureData?.teams?.away.logo}
                  />
                </div>
                <h2 className="text-center mt-2">
                  Betted on {formatOutcome(matchup.outcome)} with{" "}
                  {matchup.wager / 10 ** 8} APT
                </h2>
              </Card>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
