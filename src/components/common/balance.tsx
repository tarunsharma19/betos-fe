"use client";
import { LogOut, Wallet } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { collapseAddress } from "@/lib/core/utils";
import { useKeylessAccounts } from "@/lib/core/useKeylessAccounts";
import { Provider, Network } from "aptos";
import { useAptosWallet } from "@/hooks/use-aptos-wallet";

const provider = new Provider(Network.TESTNET);
function UserBalance() {
  const { activeAccount, accounts, disconnectKeylessAccount } =
    useKeylessAccounts();

  const { account, handleDisconnect } = useAptosWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!activeAccount && !account) return null;

  console.log("account", accounts);

  return (
    <div className="flex items-center justify-between">
      <div className="border-2 rounded-full px-4 py-1 border-yellow-400 bg-white">
        {
          <p className="text-xs">
            {activeAccount?.accountAddress
              ? collapseAddress(activeAccount.accountAddress.toString())
              : collapseAddress(account?.address)}
          </p>
        }
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <Button
        className="rounded-full"
        variant={"default"}
        size={"icon"}
        onClick={async () => {
          setLoading(true);
          try {
            await handleDisconnect();
            disconnectKeylessAccount();
          } catch (error: any) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        <LogOut size={24} />
      </Button>
    </div>
  );
}

export default UserBalance;
