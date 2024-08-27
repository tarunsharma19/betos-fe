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
  return (
    <div className="flex  items-center text-sm">
      <div
        className="h-8 bg-[#0fc777] rounded-l-xl flex justify-center items-center "
        style={{
          width: `${home}%`,
        }}
      >
        {home > 15 && (
          <div className="text-white text-xs font-bold ">{home}%</div>
        )}
      </div>
      <div
        className="h-8 bg-[#eab308] flex justify-center items-center "
        style={{
          width: `${draw}%`,
        }}
      >
        {draw > 15 && (
          <div className="text-white text-xs font-bold ">{draw}%</div>
        )}
      </div>
      <div
        className="h-8 bg-[#2a61db] rounded-r-xl flex justify-center items-center "
        style={{
          width: `${away}%`,
        }}
      >
        {away > 15 && (
          <div className="text-white text-xs font-bold ">{away}%</div>
        )}
      </div>
    </div>
  );
}
