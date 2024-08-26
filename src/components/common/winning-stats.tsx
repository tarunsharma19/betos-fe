"use client";

export function WinningStats({
  home,
  draw,
  away,
}: {
  home: number;
  draw: number;
  away: number;
}) {
  return (
    <div className="flex mt-4">
      <div
        className="h-10 bg-[#0fc777] rounded-l-xl flex justify-center items-center"
        style={{
          width: `${home}%`,
        }}
      >
        {home > 15 && (
          <div className="text-white text-sm font-bold">{home}%</div>
        )}
      </div>
      <div
        className="h-10 bg-[#eab308] flex justify-center items-center"
        style={{
          width: `${draw}%`,
        }}
      >
        {draw > 15 && (
          <div className="text-white text-sm font-bold">{draw}%</div>
        )}
      </div>
      <div
        className="h-10 bg-[#2a61db] rounded-r-xl flex justify-center items-center"
        style={{
          width: `${away}%`,
        }}
      >
        {away > 15 && (
          <div className="text-white text-sm font-bold">{away}%</div>
        )}
      </div>
    </div>
  );
}
