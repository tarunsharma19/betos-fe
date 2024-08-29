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
import { ResourceData, useAptos } from "@/contexts/aptos-context";
import { AccountAddress } from "@aptos-labs/ts-sdk";
import Widget from "@/components/common/penora";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function AccountPage() {
  const { activeAccount } = useKeylessAccounts();
  const { account } = useAptosWallet();
  const [accountHasResource, setAccountHasResource] = useState<boolean>(false);
  const navigate = useRouter();

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
    if (!accountAddress || resourceData.length === 0) return;

    const fixtureFiltered = resourceData.reduce(
      (acc: any[], resource: ResourceData) => {
        const filtered = resource.value.predictions.filter(
          (bet: any) => bet.user === convertAddress(accountAddress)
        );
        return [...acc, ...filtered];
      },
      []
    );

    setFilteredBets(fixtureFiltered);
  }, [resourceData, accountAddress]);

  const fetchReels = useCallback(async (uniqueIds: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://data-server-aptos.onrender.com/recent-bets",
        {
          method: "POST",
          body: JSON.stringify({ fixtureIds: uniqueIds }),
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

  const [combinedBets, setCombinedBets] = useState<any[]>([]);

  useEffect(() => {
    if (filteredBets.length > 0) {
      const uniqueIds = getUniqueFixtureIds(filteredBets);
      fetchReels(uniqueIds).then((res) => {
        const betsData = res.data;

        const combined = filteredBets.map((bet) => {
          const fixtureData = betsData.find((data: any) => {
            return data.fixture.id.toString() === bet.fixture_id.toString();
          });
          return { ...bet, fixtureData: fixtureData || {} };
        });

        console.log("combined", combined);
        setCombinedBets(combined);
      });
    }
  }, [filteredBets, fetchReels]);

  return (
    <div className="h-full">
      <UserBalance />
      <h1 className={cn("text-xl font-bold mt-3", unbounded.className)}>
        My Account
      </h1>
      <Card className="h-40 p-4 mt-2 flex flex-col gap-3 rounded-2xl border-2 border-black">
        <h2 className={cn("text-xs font-semibold", unbounded.className)}>
          {accountAddress ? collapseAddress(accountAddress) : "Not Connected"}
        </h2>
        <h1 className="text-xl font-bold">
          {balance==0 ? `${balance} APT` : "Fetching Balance..."}{" "}
        </h1>
        <h2 className={cn("text-xs font-semibold", unbounded.className)}>
          Total bets
        </h2>
        <h1 className="text-xl font-bold">{filteredBets.length}</h1>
      </Card>
      <div className="">
        <div className=" flex h-20 p-4 w-full mt-3 bg-white justify-between items-center rounded-2xl  border-2 border-black">
          <p className={cn("text-sm font-semibold ", unbounded.className)}>
            Swap you token to $APT and start Betting,
          </p>
          <Button className="rounded-xl" onClick={() => navigate.push("/swap")}>
            Swap Now
          </Button>
        </div>
      </div>
      {/* <Widget /> */}
      <div className="mt-4 mb-4">
        <h1 className={cn("text-xl font-bold mt-3", unbounded.className)}>
          Recent Bets
        </h1>
      </div>
      {combinedBets.length > 0 ? (
        <MatchCardsProfile combinedData={combinedBets} />
      ) : (
        <p>No recent bets found. Create a new bet to get started!</p>
      )}
    </div>
  );
}

export default AccountPage;
