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
import { MatchupCard } from "./MatchupCard";
import { useSearchParams } from "next/navigation";

export interface IOddValue {
  value: string;
  odd: number;
  _id: string;
}

export interface IBet {
  id: number;
  name: string;
  values: IOddValue[];
  _id: string;
}

export interface IOdds {
  bets: IBet[];
}

export interface ITeam {
  name: string;
  logo: string;
}

export interface ITeams {
  home: ITeam;
  away: ITeam;
}

export interface IFixture {
  id: number;
  timezone: string;
  date: string;
}

export interface ILeague {
  name: string;
  country: string;
  logo: string;
}

export interface IReelFixture {
  fixture: IFixture;
  league: ILeague;
  teams: ITeams;
  odds: IOdds;
  _id: string;
}

export function SlidingCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();

  const scrollNext = () => {
    api?.scrollNext();
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
  const [reels, setReels] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const searchParams = useSearchParams();

  const fixtureId = searchParams.get("fixtureId");

  const fetchReels = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://data-server-aptos.onrender.com/reels");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      if (!data.data) throw new Error("No data found");
      let response = data.data;

      if (fixtureId) {
        // Parse fixtureId to a number for comparison, if it's a string
        const fixtureIdNumber = Number(fixtureId);

        // Find the index of the item with the matching fixture.id
        const index = response.findIndex(
          (reel: IReelFixture) => reel.fixture.id === fixtureIdNumber
        );

        if (index !== -1) {
          // Remove the item from its original position and create a new array
          const matchedReel = response.splice(index, 1)[0];
          // Add the item to the beginning of the array
          response = [matchedReel, ...response];
        }
      }

      setReels(response);
    } catch (e: any) {
      setError(e.message);
      setReels([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchReels();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      orientation="vertical"
      className="w-full h-auto flex-grow"
      setApi={setApi}
    >
      <CarouselContent className="mt-2 h-[80svh] min-h-[350px] ">
        {reels &&
          reels.map((reel: IReelFixture, index: any) => (
            <CarouselItem key={index} className="pt-1 md:basis h-full">
              <div className="p-1 h-full">
                <MatchupCard
                  homeTeam={reel.teams.home.name}
                  awayTeam={reel.teams.away.name}
                  homeLogo={reel.teams.home.logo}
                  awayLogo={reel.teams.away.logo}
                  reel={reel}
                  scrollNext={scrollNext}
                />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}

export const TeamCard = ({
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
        className="aspect-square h-20 w-20  p-3  rounded-xl"
      >
        <Image
          src={teamLogo}
          width={60}
          height={60}
          className="w-full h-full object-contain"
          alt={teamName}
        />
      </Button>
      <h3 className="text-center font-semibold text-xs mt-1">{teamName}</h3>
    </div>
  );
};
