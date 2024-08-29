"use client";
import { LogOut, Wallet } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { collapseAddress } from "@/lib/core/utils";
import { useKeylessAccounts } from "@/lib/core/useKeylessAccounts";
import { Provider, Network } from "aptos";
import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import Image from "next/image";

const provider = new Provider(Network.TESTNET);
function UserBalance() {
  const { activeAccount, accounts, disconnectKeylessAccount } =
    useKeylessAccounts();

  const { account, handleDisconnect, isLoading } = useAptosWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex justify-between items-center">
      <div className="h-10">
        <Image
          src="/assets/brand-assets/brandlogo.png"
          alt="Brand"
          className="w-full h-full"
          width={150}
          height={100}
        />
      </div>

      {((!isLoading && account) || activeAccount) && (
        <div className="flex items-center  gap-2">
          <div className="flex items-center border-2 rounded-xl px-4 h-8 py-1 border-zinc-800 bg-white">
            {
              <p className="text-xs">
                {activeAccount?.accountAddress
                  ? collapseAddress(activeAccount.accountAddress.toString())
                  : collapseAddress(account?.address)}
              </p>
            }
          </div>

          <Button
            className="rounded-full p-2  h-[32px] w-[32px] border-zinc-800 border-2"
            variant={"outline"}
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
      )}
    </div>
  );
}

export default UserBalance;
