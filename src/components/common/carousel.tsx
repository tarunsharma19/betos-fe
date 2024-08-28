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
import { fetchReels } from "@/action";
import { useLongPress } from "@uidotdev/usehooks";
import { toast } from "sonner";
import { useMotionValue, useTransform, motion } from "framer-motion";

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

  const fetchReels = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://data-server-aptos.onrender.com/reels");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setReels(data.data);
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

const MatchupCard = ({
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
  reel,
  scrollNext,
}: {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  reel: any;
  scrollNext: any;
}) => {
  const [selected, setSelected] = React.useState<string>("");
  const [amount, setAmount] = React.useState<number>(0);
  const [reward, setReward] = React.useState<number>(0);

  // Extract odds values
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const oddsValues = reel?.odds.bets[0]?.values || [];

  // Memoize the oddsForRadio object to prevent unnecessary recalculations
  const oddsForRadio: any = React.useMemo(() => {
    return {
      home:
        oddsValues.find(
          (odd: { value: string; odd: number }) => odd.value === "Home"
        )?.odd || 0,
      draw:
        oddsValues.find(
          (odd: { value: string; odd: number }) => odd.value === "Draw"
        )?.odd || 0,
      away:
        oddsValues.find(
          (odd: { value: string; odd: number }) => odd.value === "Away"
        )?.odd || 0,
    };
  }, [oddsValues]);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const addAmount = (value: number) => {
    setAmount((prevAmount) => prevAmount + value);
  };

  // Calculate reward whenever selected or amount changes
  React.useEffect(() => {
    if (selected && amount > 0) {
      setReward(amount * oddsForRadio[selected]);
    } else {
      setReward(0);
    }
  }, [amount, selected, oddsForRadio]);

  // Long press handler for placing a bet
  const duration = 500; // Total time to fill the button (in ms)

  // Track the progress as a motion value
  const progress = useMotionValue(0);

  // Synchronize the React state with the MotionValue
  const [stateProgress, setStateProgress] = React.useState<number>(0);

  React.useEffect(() => {
    progress.set(stateProgress);
  }, [stateProgress, progress]);
  const fillHeight = useTransform(progress, [0, 100], ["100%", "0%"]);

  const handleLongPress = () => {
    toast.success("Bet Placed Successfully!");
    // Additional logic for placing the bet can be added here
  };

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (stateProgress > 0 && stateProgress < 100) {
      timer = setTimeout(() => {
        setStateProgress((prev: any) => Math.min(prev + 1000 / duration, 100)); // Increment progress
      }, 10); // Update every 10ms
    }

    return () => clearTimeout(timer); // Cleanup timer on component unmount or progress reset
  }, [duration, stateProgress]);

  // Use the long press hook and update progress
  const attrs = useLongPress(
    () => {
      handleLongPress();
      setStateProgress(0); // Reset progress after the action
    },
    {
      onStart: (event) => {
        setStateProgress(1); // Start the progress
      },
      onFinish: (event) => {
        setStateProgress(0); // Reset progress when long press finishes
        scrollNext();
      },
      onCancel: (event) => {
        setStateProgress(0); // Reset progress when long press is cancelled
        toast.warning("Long Press to Place Bet!");
      },
      threshold: duration,
    }
  );

  return (
    <Card className="h-full border p-3 rounded-xl flex flex-col items-center py-5">
      <CardContent className="p-4 h-full flex flex-col gap-3 justify-center items-center">
        <div className="flex-grow">
          <div className="grid grid-cols-3 w-full">
            <TeamCard teamName={homeTeam} teamLogo={homeLogo} />
            <div className="flex justify-center h-auto items-center aspect-square">
              <Image src={"/assets/vs.png"} width={40} height={40} alt="VS" />
            </div>
            <TeamCard teamName={awayTeam} teamLogo={awayLogo} />
          </div>
          <h6 className={cn("text-sm mt-4 font-semibold", unbounded.className)}>
            Winning Percentage:
          </h6>
          <WinningStats
            home={oddsForRadio.home}
            draw={oddsForRadio.draw}
            away={oddsForRadio.away}
          />
          <h6 className={cn("text-sm mt-4 font-semibold", unbounded.className)}>
            Odds:
          </h6>
          <SelectSideRadioButtons
            odds={oddsForRadio}
            selectedValue={selected}
            onChange={handleSelect}
          />
          <div className="grid grid-cols-6 place-items-center mt-4 gap-1">
            <Input
              placeholder="Enter your Amount"
              className="w-full rounded-full col-span-4"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
            <div className="col-span-2">
              <Select defaultValue="apt">
                <SelectTrigger className="rounded-full w-full">
                  <SelectValue placeholder="Token" className="text-xs" />
                </SelectTrigger>
                <SelectContent className="w-full rounded-2xl">
                  <SelectGroup>
                    <SelectItem value="apt" className="rounded-2xl">
                      <div className="flex items-center gap-2">
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
            "text-sm text-left w-full mt-4 font-semibold",
            unbounded.className
          )}
        >
          {reward > 0 ? <>Est Rewards: {reward.toFixed(2)}</> : <></>}
        </h6>
        <div className="w-full relative">
          <motion.div
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
            {...attrs} // Spread the long press handlers onto the motion div
            className="relative w-full h-full bg-transparent"
          >
            <motion.div
              style={{
                height: fillHeight,
              }}
              className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-xl"
            />
            <Button
              variant={"default"}
              className="w-full bg-gray-600 rounded-xl relative"
            >
              Place Bet
            </Button>
          </motion.div>
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
      <h3 className="text-center font-semibold text-xs mt-1">{teamName}</h3>
    </div>
  );
};
