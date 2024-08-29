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
import useAccountBalance from "../../hooks/use-account-balance";
import { ResourceData, useAptos } from "@/contexts/aptos-context";
import { AccountAddress } from "@aptos-labs/ts-sdk";

function AccountPage() {
  const { activeAccount } = useKeylessAccounts();
  const { account } = useAptosWallet();
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [accountHasResource, setAccountHasResource] = useState<boolean>(false);

  const { resourceData } = useAptos();

  useEffect(() => {
    const address = account?.address || activeAccount?.accountAddress;
    if (address) {
      setAccountAddress(address.toString());
    }
  }, [account, activeAccount]);

  const balance = useAccountBalance();

  const [filteredBets, setFilteredBets] = useState<ResourceData[]>([]);

  console.log("resourceData", resourceData);

  useEffect(() => {
    if (!accountAddress || resourceData.length === 0) {
      return;
    }

    console.log("acc-address", accountAddress);

    const filtered = resourceData.filter((resource) =>
      resource.value.predictions.some(
        (prediction) => prediction.user === accountAddress
      )
    );

    // Only update state if the filtered data is different
    setFilteredBets((prevFilteredBets) => {
      const isSame =
        JSON.stringify(prevFilteredBets) === JSON.stringify(filtered);
      return isSame ? prevFilteredBets : filtered;
    });
  }, [resourceData, accountAddress]);

  console.log("filteredBets", filteredBets);

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
        <h1 className="text-xl font-bold">
          {balance ? balance + " APT" : "Fetching Balance..."}{" "}
        </h1>
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
      {resourceData.length > 0 ? (
        <MatchCardsProfile />
      ) : (
        <p>No recent bets found. Create a new bet to get started!</p>
      )}
    </div>
  );
}

export default AccountPage;
