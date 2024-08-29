import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../ui/card";
import Image from "next/image";
import { TeamCardHome } from "./team-card-home";
import { WinningStatsHome } from "./winning-stats-home";
import { cn, unbounded } from "@/lib/utils";
import { IReelFixture } from "./carousel";
import { Button } from "../ui/button";

export function MatchCardsHome() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: "60px",
    responsive: [
      { breakpoint: 768, settings: { centerPadding: "40px" } },
      { breakpoint: 480, settings: { centerPadding: "20px" } },
    ],
  };

  const [reels, setReels] = React.useState<IReelFixture[] | []>([]);
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
    <div>
      <Slider {...settings}>
        {reels.map((matchup, index) => (
          <MatchCard key={index} matchup={matchup} />
        ))}
      </Slider>
    </div>
  );
}

const MatchCard = ({ matchup }: { matchup: IReelFixture }) => {
  const oddsValues = matchup?.odds.bets[0]?.values || [];
  return (
    <div className="px-1">
      <Card className="bg-white p-3 rounded-2xl flex flex-col justify-between">
        <div className="grid grid-cols-5 w-full">
          <TeamCardHome
            teamName={matchup.teams.home.name}
            teamLogo={matchup.teams.home.logo}
          />
          <div className="flex justify-center p-3 items-center h-16">
            <Image src={"/assets/vs.png"} width={40} height={40} alt="VS" />
          </div>
          <TeamCardHome
            teamName={matchup.teams.away.name}
            teamLogo={matchup.teams.away.logo}
          />
        </div>
        <hr className="my-2" />
        <h6 className={cn("text-sm mb-1 font-semibold", unbounded.className)}>
          Winning Percentage:
        </h6>
        <WinningStatsHome
          home={oddsValues[0].odd}
          draw={oddsValues[1].odd}
          away={oddsValues[2].odd}
        />
        <Button
          variant={"default"}
          className="w-full mt-4 bg-gray-600 rounded-xl relative"
        >
          Place Bet
        </Button>
      </Card>
    </div>
  );
};
