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
import { WinningStats } from "./winning-stats";
import { SelectSideRadioButtons } from "./select-side";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "../ui/badge";

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
      homeLogo: "/assets/team1.png",
      awayLogo: "/assets/team2.png",
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
      className="w-full h-auto flex-grow"
      setApi={setApi}
    >
      <CarouselContent className=" mt-10 h-[70vh]">
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
  const [selected, setSelected] = React.useState("");

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const [amount, setAmount] = React.useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const addAmount = (value: number) => {
    setAmount(amount + value);
  };

  return (
    <Card className="h-full border p-3 rounded-xl flex flex-col items-center">
      <CardTitle className="text-center text-sm border rounded-full px-1 py-1">
        {`${homeTeam} V/s ${awayTeam}`}
      </CardTitle>
      <CardContent className="p-4 h-full flex flex-col gap-5">
        <div className="flex-grow">
          <div className="grid grid-cols-3 w-full ">
            <TeamCard teamName={homeTeam} teamLogo={homeLogo} />
            <div className="flex justify-center h-auto items-center aspect-square">
              <Image src={"/assets/vs.png"} width={40} height={40} alt="VS" />
            </div>
            <TeamCard teamName={awayTeam} teamLogo={awayLogo} />
          </div>
          <WinningStats home={15} draw={35} away={65} />
          <SelectSideRadioButtons
            selectedValue={selected}
            onChange={handleSelect}
          />
          <div className="grid grid-cols-6  place-items-center mt-4 gap-1">
            <Input
              placeholder="Enter your Amount"
              className="w-full rounded-full  col-span-4"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
            <div className="col-span-2">
              <Select>
                <SelectTrigger className=" rounded-full  w-full">
                  <SelectValue placeholder="Token" className="text-sm" />
                </SelectTrigger>
                <SelectContent className="w-full rounded-2xl ">
                  <SelectGroup>
                    <SelectItem value="apt" className="rounded-2xl">
                      <div className="flex  items-center gap-2">
                        <Image
                          src={"/assets/aptos-apt-logo.png"}
                          width={20}
                          height={20}
                          alt="APT"
                        />
                        <span>APT</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <Badge
              variant={"secondary"}
              className="flex justify-center items-center py-1"
              onClick={() => addAmount(1)}
            >
              +1
            </Badge>
            <Badge
              variant={"secondary"}
              className="flex justify-center items-center py-1"
              onClick={() => addAmount(10)}
            >
              +10
            </Badge>
            <Badge
              variant={"secondary"}
              className="flex justify-center items-center py-1"
              onClick={() => addAmount(100)}
            >
              +100
            </Badge>
          </div>
        </div>
        <div className="">
          <Button variant={"default"} className="w-full  rounded-xl">
            Place Bet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

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
        className="aspect-square p-2 w-full h-auto rounded-xl"
      >
        <Image
          src={teamLogo}
          width={100}
          height={100}
          className="w-full h-full object-contain"
          alt={teamName}
        />
      </Button>
      <h3 className="text-center font-semibold">{teamName}</h3>
    </div>
  );
};
