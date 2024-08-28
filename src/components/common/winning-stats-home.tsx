"use client";

export function WinningStatsHome({
  home,
  draw,
  away,
}: {
  home: number;
  draw: number;
  away: number;
}) {
  const home_per = 100/home;
  const draw_per = 100/draw;
  const away_per = 100/away;

  const total_per = home_per+draw_per+away_per;
  const home_winning = Math.round(100*home_per/total_per);
  const draw_winning = Math.round(100*draw_per/total_per);
  const away_winning = Math.round(100*away_per/total_per);

  // console.log(home_winning,draw_winning,away_winning,"test")

  return (
    <div className="flex mt-1 text-sm">
      <div
        className="h-8 bg-[#0fc777] rounded-l-xl flex justify-center items-center "
        style={{
          width: `${home_winning}%`,
        }}
      >
        {home_winning > 10 && (
          <div className="text-white text-xs font-bold ">{home_winning}%</div>
        )}
      </div>
      <div
        className="h-8 bg-[#eab308] flex justify-center items-center "
        style={{
          width: `${draw_winning}%`,
        }}
      >
        {draw_winning > 10 && (
          <div className="text-white text-xs font-bold ">{draw_winning}%</div>
        )}
      </div>
      <div
        className="h-8 bg-[#2a61db] rounded-r-xl flex justify-center items-center "
        style={{
          width: `${away_winning}%`,
        }}
      >
        {away_winning > 10 && (
          <div className="text-white text-xs font-bold ">{away_winning}%</div>
        )}
      </div>
    </div>
  );
}
