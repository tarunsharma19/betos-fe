"use client";
import * as React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import { ProgressBar } from "./winning-stats";
import { SelectSideRadioButtons } from "./select-side";

export function SlidingCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();

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
      homeLogo: "/assets/team3.png",
      awayLogo: "/assets/team4.png",
    },
    // Add more matchups here
  ];

  React.useEffect(() => {
    if (!api) return;

    // const interval = setInterval(() => {
    //   api.scrollNext();
    // }, 2000); // Scrolls every 2 seconds
  }, [api]);

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      orientation="vertical"
      className="w-full"
      setApi={setApi}
    >
      <CarouselContent className="my-16 h-[700px]">
        {teams.map((matchup, index) => (
          <CarouselItem key={index} className="pt-1 md:basis h-full">
            <div className="p-1 h-full">
              <MatchupCard
                homeTeam={matchup.home}
                awayTeam={matchup.away}
                homeLogo={matchup.homeLogo}
                awayLogo={matchup.awayLogo}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

const MatchupCard = ({
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
}: {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
}) => {
  const segments = [
    { percentage: 40, color: "[#0fc777]", label: "Home 40%" },
    { percentage: 30, color: "[#fff100]", label: "Draw 30%" },
    { percentage: 30, color: "[#ff6262]", label: "Away 30%" },
  ];
  return (
    <Card className="h-full border p-3 rounded-xl flex flex-col items-center">
      <CardTitle className="text-center text-sm border rounded-full px-3 py-1">
        {`${homeTeam} V/s ${awayTeam}`}
      </CardTitle>
      <CardContent className="p-6 h-full">
        <div className="grid grid-cols-3 w-full ">
          <TeamCard teamName={homeTeam} teamLogo={homeLogo} />
          <div className="flex justify-center h-auto items-center aspect-square">
            <Image src={"/assets/vs.png"} width={40} height={40} alt="VS" />
          </div>
          <TeamCard teamName={awayTeam} teamLogo={awayLogo} />
        </div>
        <ProgressBar segments={segments} />
        <SelectSideRadioButtons />
        <div className=""></div>
      </CardContent>
    </Card>
  );
};

const TeamCard = ({
  teamName,
  teamLogo,
}: {
  teamName: string;
  teamLogo: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <Button
        size={"icon"}
        variant={"outline"}
        className="aspect-square p-2 w-full h-auto rounded-xl"
      >
        <Image
          src={teamLogo}
          width={100}
          height={100}
          className="w-full h-full"
          alt={teamName}
        />
      </Button>
      <h3 className="text-center font-semibold">{teamName}</h3>
    </div>
  );
};
