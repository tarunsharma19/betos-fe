"use client";

import UserBalance from "@/components/common/balance";
import { MatchCardsProfile } from "@/components/common/MobileCardsProfile";
import { Card } from "@/components/ui/card";
import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import { aptos, fetchResource } from "@/lib/aptos";
import { useKeylessAccounts } from "@/lib/core/useKeylessAccounts";
import { collapseAddress } from "@/lib/core/utils";
import { cn, unbounded } from "@/lib/utils";
import { useEffect, useState } from "react";
import useAccountBalance from "../hooks/use-account-balance";
import { ResourceData } from "@/contexts/aptos-context";
import { AccountAddress } from "@aptos-labs/ts-sdk";

function AccountPage() {
  const { activeAccount } = useKeylessAccounts();
  const { account } = useAptosWallet();
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);
  const [accountHasResource, setAccountHasResource] = useState<boolean>(false);

  const fetchResourceData = async (address: string) => {
    console.log("Fetching resource data for address:", address);
    if (!address) return;
    const resource = await fetchResource(address);

    if (resource) {
      setResourceData([resource]); // Assuming resource is an object and you want to wrap it in an array
      setAccountHasResource(true);
    } else {
      setResourceData([]);
      setAccountHasResource(false);
    }
  };

  useEffect(() => {
    const address = account?.address || activeAccount?.accountAddress;
    if (address) {
      setAccountAddress(address.toString());
      fetchResourceData(address.toString());
    }
  }, [account, activeAccount]);

  const balance = useAccountBalance();

  return (
    <div className="h-full">
      <UserBalance />
      <h1 className={cn("text-xl font-bold mt-3", unbounded.className)}>
        My Account
      </h1>
      <Card className="h-40 p-4 mt-2 flex flex-col gap-3 rounded-2xl">
        <h2 className={cn("text-xs font-semibold", unbounded.className)}>
          {accountAddress ? collapseAddress(accountAddress) : "Not Connected"}
        </h2>
        <h1 className="text-xl font-bold">{balance && balance+" APT"} </h1>
        <h2 className={cn("text-xs font-semibold", unbounded.className)}>
          Total bets
        </h2>
        <h1 className="text-xl font-bold">10</h1>
      </Card>
      <div className="mt-4 mb-4">
        <h1 className={cn("text-xl font-bold mt-3", unbounded.className)}>
          Recent Bets
        </h1>
      </div>
      {accountHasResource ? (
        <MatchCardsProfile />
      ) : (
        <p>No recent bets found. Create a new bet to get started!</p>
      )}
    </div>
  );
}

export default AccountPage;
