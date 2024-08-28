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
import { cn, unbounded } from "@/lib/utils";

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
      away: "Big Blues",
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
      <CarouselContent className="mt-2 h-[80svh] min-h-[350px] ">
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
  const [amount, setAmount] = React.useState(0);
  const [reward, setReward] = React.useState(0);
  const [odds, setOdds] = React.useState<any>({
    "home": 1.0,
    "draw": 1.5,
    "away": 2.0,
  });

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const addAmount = (value: number) => {
    setAmount(amount + value);
  };

  React.useEffect(()=>{
    setReward(amount*odds[selected])
  },[amount,selected])

  
  console.log(amount,selected,"amount selected")
  return (
    <Card className="h-full border p-3 rounded-xl flex flex-col items-center py-5">
      <CardTitle className="text-center text-xs border rounded-full px-1 py-1">
        {`${homeTeam} V/s ${awayTeam}`}
      </CardTitle>
      <CardContent className="p-4 h-full flex flex-col gap-3 justify-center items-center">
        <div className="flex-grow">
          <div className="grid grid-cols-3 w-full ">
            <TeamCard teamName={homeTeam} teamLogo={homeLogo} />
            <div className="flex justify-center h-auto items-center aspect-square">
              <Image src={"/assets/vs.png"} width={40} height={40} alt="VS" />
            </div>
            <TeamCard teamName={awayTeam} teamLogo={awayLogo} />
          </div>
          <h6
                className={cn(
                  " text-sm mt-4 font-semibold ",
                  unbounded.className
                )}
              >
                Winning Percentage:
          </h6>
          <WinningStats home={odds.home} draw={odds.draw} away={odds.away} />
          <h6
                className={cn(
                  " text-sm mt-4 font-semibold ",
                  unbounded.className
                )}
              >
                Odds:
          </h6>
          <SelectSideRadioButtons
            odds={odds}
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
              <Select defaultValue="apt">
                <SelectTrigger className=" rounded-full  w-full">
                  <SelectValue placeholder="Token" className="text-xs" />
                </SelectTrigger>
                <SelectContent className="w-full rounded-2xl ">
                  <SelectGroup>
                    <SelectItem value="apt" className="rounded-2xl">
                      <div className="flex  items-center gap-2">
                        <Image
                          src={"/assets/aptos-apt-logo.png"}
                          width={15}
                          height={15}
                          alt="APT"
                        />
                        <span className="text-xs">APT</span>
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
        <h6
                className={cn(
                  " text-sm text-left w-full mt-4 font-semibold ",
                  unbounded.className
                )}
              >
                {reward ? <>Est Rewards: {reward}</>:<></>}
          </h6>
        <div className="w-full">
          <Button variant={"default"} className="w-full bg-black   rounded-xl">
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
      <h3 className="text-center font-semibold text-sm mt-1">{teamName}</h3>
    </div>
  );
};
