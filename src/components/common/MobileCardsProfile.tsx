"use client";

import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../ui/card";
import { TeamCard } from "./carousel";
import Image from "next/image";
import { formatUtcDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

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

  const [fixtureData, setFixtureData] = React.useState<any[]>([]);

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

  useEffect(() => {
    const filteredData = combinedData.filter(
      (data: any) => Object.keys(data.fixtureData).length !== 0
    );

    function groupBetsByFixtureAndOutcome(bets: any) {
      const groupedBets: any = {};

      bets.forEach((bet: any) => {
        const key = `${bet.fixture_id}-${bet.outcome}`;

        if (!groupedBets[key]) {
          groupedBets[key] = {
            fixture_id: bet.fixture_id,
            odds: bet.odds,
            outcome: bet.outcome,
            user: bet.user,
            wager: parseInt(bet.wager, 10),
            fixtureData: bet.fixtureData,
          };
        } else {
          groupedBets[key].wager += parseInt(bet.wager, 10);
        }
      });

      return Object.values(groupedBets);
    }

    const groupedBets = groupBetsByFixtureAndOutcome(filteredData);
    console.log("groupedBets", groupedBets);
    setFixtureData(groupedBets);
  }, [combinedData]);

  return (
    <div className="">
      {fixtureData.length === 1 &&
        fixtureData?.map((machup: any, i: any) => (
          <div className="px-1" key={i}>
            <Card className="bg-white p-6  rounded-2xl h-52">
              {/* {JSON.stringify(machup.fixtureData.teams)} */}
              <div className=" flex justify-center mb-2">
                <Badge className="text-center " variant={"secondary"}>
                  {formatUtcDate(machup.fixtureData?.fixture?.date)}
                </Badge>
              </div>
              <div className="grid grid-cols-3 w-full ">
                <TeamCard
                  teamName={machup.fixtureData?.teams?.home.name}
                  teamLogo={machup.fixtureData?.teams?.home.logo}
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
                  teamName={machup.fixtureData?.teams?.away.name}
                  teamLogo={machup.fixtureData?.teams?.away.logo}
                />
              </div>
              <h2 className="text-center">
                Betted on {formatOutcome(machup.outcome)}
              </h2>
            </Card>
          </div>
        ))}
      <Slider {...settings} className="">
        {fixtureData.length > 1 &&
          fixtureData?.map((machup: any, i: any) => (
            <div className="px-1" key={i}>
              <Card className="bg-white p-6  rounded-2xl h-52">
                {/* {JSON.stringify(machup.fixtureData.teams)} */}
                <div className=" flex justify-center mb-2">
                  <Badge className="text-center " variant={"secondary"}>
                    {formatUtcDate(machup.fixtureData?.fixture?.date)}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 w-full ">
                  <TeamCard
                    teamName={machup.fixtureData?.teams?.home.name}
                    teamLogo={machup.fixtureData?.teams?.home.logo}
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
                    teamName={machup.fixtureData?.teams?.away.name}
                    teamLogo={machup.fixtureData?.teams?.away.logo}
                  />
                </div>
                <h2 className="text-center">
                  Betted on {formatOutcome(machup.outcome)}
                </h2>
              </Card>
            </div>
          ))}
      </Slider>
    </div>
  );
}
