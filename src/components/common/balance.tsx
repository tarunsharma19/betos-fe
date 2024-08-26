import { Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function UserBalance() {
  return (
    <div className="flex items-center justify-between">
      <div className="border-2 rounded-full px-4 py-1 border-yellow-400  bg-white">
        14.045 APT
      </div>
      <Button className="rounded-full" variant={"default"} size={"icon"}>
        <Wallet size={24} />
      </Button>
    </div>
  );
}

export default UserBalance;
