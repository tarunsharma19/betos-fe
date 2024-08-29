// src/hooks/useAccountBalance.ts
import { useEffect, useState } from "react";
import { getBalance } from "@/lib/aptos";
import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import { useKeylessAccounts } from "@/lib/core/useKeylessAccounts";
import { AccountAddress } from "@aptos-labs/ts-sdk";

const useAccountBalance = () => {
  const { activeAccount } = useKeylessAccounts();
  const { account } = useAptosWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const accountAddress = activeAccount?.accountAddress || account?.address;
    if (!accountAddress) return;

    const fetchBalance = async () => {
      try {
        if (!accountAddress) return;
        const res = await getBalance(accountAddress as AccountAddress);
        setBalance(res / 10 ** 8); // Assuming balance is in micro units
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        setBalance(null);
      }
    };

    fetchBalance();
  }, [activeAccount, account]);

  return balance;
};

export default useAccountBalance;
