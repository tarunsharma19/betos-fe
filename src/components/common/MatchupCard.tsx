import * as React from "react";
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
import { useLongPress } from "@uidotdev/usehooks";
import { toast } from "sonner";
import { useMotionValue, useTransform, motion } from "framer-motion";
import useAccountBalance from "@/hooks/use-account-balance";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { placeBet } from "@/lib/aptos";
import { Card, CardContent } from "../ui/card";
import { TeamCard } from "./carousel";
import Image from "next/image";
import { Button } from "../ui/button";

export const MatchupCard = ({
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
  const { account, signAndSubmitTransaction } = useWallet();
  const [transactionInProgress, setTransactionInProgress] =
    React.useState<boolean>(false);

  const balance = useAccountBalance();

  const oddsValues = React.useMemo(
    () => reel?.odds.bets[0]?.values || [],
    [reel]
  );

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
    const newAmount = Number(e.target.value);
    if (balance === null || newAmount > balance) {
      toast.error("Insufficient Balance");
      return;
    }
    setAmount(newAmount);
  };

  const addAmount = (value: number) => {
    if (balance === null) return;
    const newAmount = amount + value;
    if (newAmount > balance) {
      toast.error("Insufficient Balance");
      return;
    }
    setAmount(newAmount);
  };

  React.useEffect(() => {
    if (selected && amount > 0) {
      setReward(amount * oddsForRadio[selected]);
    } else {
      setReward(0);
    }
  }, [amount, selected, oddsForRadio]);

  const handlePlaceBet = async () => {
    if (!account || !selected || amount <= 0) {
      toast.error("Invalid bet details");
      return;
    }

    setTransactionInProgress(true);
    const betDetails = {
      address: account.address,
      fixtureId: reel.fixture.id,
      option: selected === "home" ? 1 : selected === "away" ? 3 : 2,
      amount: Math.floor(amount * 10 ** 8),
    };

    const success = await placeBet(signAndSubmitTransaction, betDetails);

    if (success) {
      toast.success("Bet placed successfully!");
      scrollNext();
    } else {
      toast.error("Failed to place bet");
    }

    setTransactionInProgress(false);
  };

  const duration = 500;
  const progress = useMotionValue(0);
  const fillHeight = useTransform(progress, [0, 100], ["100%", "0%"]);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleLongPress = async () => {
    await handlePlaceBet(); // Execute the bet placement
  };

  const attrs = useLongPress(
    () => {
      handleLongPress(); // Called when the hold is completed
      progress.set(0); // Reset progress after action
    },
    {
      onStart: () => {
        // Increment progress continuously over the duration
        intervalRef.current = setInterval(() => {
          const currentProgress = progress.get(); // Get the current value
          progress.set(Math.min(currentProgress + (1000 / duration) * 10, 100));
        }, 10);
      },
      onFinish: () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current); // Clear the interval on completion
        }
        progress.set(0); // Reset progress when hold is complete
      },
      onCancel: () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current); // Clear the interval on cancel
        }
        progress.set(0); // Reset progress if the user cancels early
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
            <div className="w-full col-span-4 flex gap-1 items-center">
              <Input
                placeholder="Enter your Amount"
                className="w-full flex-grow rounded-full border-none focus-visible:ring-0"
                type="number"
                value={amount === 0 ? "" : amount.toString()}
                onChange={handleAmountChange}
              />
              <div className="text-gray-500">
                <span>Max: {balance}</span>
              </div>
            </div>
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
              onClick={() => addAmount(0.01)}
            >
              +0.01
            </Badge>
            <Badge
              variant={"secondary"}
              className="flex justify-center items-center py-1"
              onClick={() => addAmount(0.05)}
            >
              +0.05
            </Badge>
            <Badge
              variant={"secondary"}
              className="flex justify-center items-center py-1"
              onClick={() => {
                if (balance !== null) {
                  setAmount(+balance.toFixed(2));
                }
              }}
            >
              Max
            </Badge>
          </div>
        </div>
        <h6
          className={cn(
            "text-sm text-left w-full mt-4 font-semibold",
            unbounded.className
          )}
        >
          {reward > 0 && <>Est Rewards: {reward.toFixed(2)}</>}
        </h6>
        <div className="w-full relative">
          {/* <motion.div
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 1 }}
            {...attrs}
            className="relative w-full h-full bg-transparent"
          >
            <motion.div
              style={{
                height: fillHeight,
                backgroundColor: "rgba(34, 197, 94, 0.8)", // Green color with some transparency
              }}
              className="absolute bottom-0 left-0 z-10 right-0 rounded-xl"
            /> */}
          <Button
            variant={"secondary"}
            className="w-full rounded-xl relative bg-gray-900 text-white hover:bg-gray-700"
            size={"lg"}
            onClick={handlePlaceBet}
            disabled={transactionInProgress}
          >
            <span className="z-20">
              {transactionInProgress ? "Placing..." : "Place Bet"}
            </span>
          </Button>
          {/* </motion.div> */}
        </div>
      </CardContent>
    </Card>
  );
};
