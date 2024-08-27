import Image from "next/image";
import { Button } from "../ui/button";

export const TeamCardHome = ({
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
        className="h-16 w-16 p-3   rounded-xl"
      >
        <Image
          src={teamLogo}
          width={40}
          height={40}
          className="w-full h-full object-contain"
          alt={teamName}
        />
      </Button>
      <h3 className="text-center font-semibold text-xs mt-1">{teamName}</h3>
    </div>
  );
};
