import { MatchCardsProfile } from "@/components/common/MobileCardsProfile";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React from "react";

function AccountPage() {
  return (
    <div className="h-full">
      <h1 className="text-xl font-bold">My Account</h1>
      <Card className="h-40 p-2 mt-3 flex justify-center flex-col gap-3 items-center">
        <h1 className="text-xl font-bold">12.012 APT</h1>
        <Badge>
          <p className="text-ellipsis overflow-hidden w-40 ">
            0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01
          </p>
        </Badge>
      </Card>
      <div className="mt-4 mb-4">
        <h1 className="text-xl font-bold">Recent Bets</h1>
      </div>
      <MatchCardsProfile />
    </div>
  );
}

export default AccountPage;
