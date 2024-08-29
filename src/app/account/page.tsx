"use client";

import UserBalance from "@/components/common/balance";
import { MatchCardsProfile } from "@/components/common/MobileCardsProfile";
import { Card } from "@/components/ui/card";
import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import { useKeylessAccounts } from "@/lib/core/useKeylessAccounts";
import { collapseAddress } from "@/lib/core/utils";
import {
  cn,
  convertAddress,
  getUniqueFixtureIds,
  unbounded,
} from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";
import useAccountBalance from "../../hooks/use-account-balance";
import { useAptos } from "@/contexts/aptos-context";

function AccountPage() {
  const { activeAccount } = useKeylessAccounts();
  const { account } = useAptosWallet();
  const { resourceData } = useAptos();

  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [filteredBets, setFilteredBets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const balance = useAccountBalance();

  useEffect(() => {
    const address = account?.address || activeAccount?.accountAddress;
    if (address) {
      setAccountAddress(address.toString());
    }
  }, [account, activeAccount]);

  useEffect(() => {
    if (!accountAddress || resourceData.length == 0) return;
    console.log(accountAddress);
    console.log("resourceData", resourceData[0].value.predictions);

    const filtered = resourceData[0].value.predictions.filter(
      (bet: any) => bet.user === convertAddress(accountAddress)
    );

    setFilteredBets(filtered);
  }, [resourceData, accountAddress]);

  const fetchReels = useCallback(async (uniqueIds: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://data-server-aptos.onrender.com/recent-bets",
        {
          method: "POST",
          body: JSON.stringify({ fixtureIds: ["1208512"] }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (filteredBets.length > 0) {
      const uniqueIds = getUniqueFixtureIds(filteredBets);
      fetchReels(uniqueIds);
    }
  }, [filteredBets, fetchReels]);

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
          {balance ? `${balance} APT` : "Fetching Balance..."}{" "}
        </h1>
        <h2 className={cn("text-xs font-semibold", unbounded.className)}>
          Total bets
        </h2>
        <h1 className="text-xl font-bold">{filteredBets.length}</h1>
      </Card>
      <div className="mt-4 mb-4">
        <h1 className={cn("text-xl font-bold mt-3", unbounded.className)}>
          Recent Bets
        </h1>
      </div>
      {filteredBets.length > 0 ? (
        <MatchCardsProfile />
      ) : (
        <p>No recent bets found. Create a new bet to get started!</p>
      )}
    </div>
  );
}

export default AccountPage;
