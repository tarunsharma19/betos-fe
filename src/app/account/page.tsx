"use client";

import { MatchCardsProfile } from "@/components/common/MobileCardsProfile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import { aptos, getBalance } from "@/lib/aptos";
import { useKeylessAccounts } from "@/lib/core/useKeylessAccounts";
import { collapseAddress } from "@/lib/core/utils";
import { cn, unbounded } from "@/lib/utils";
import { Account, Aptos, AptosConfig, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";
import React, { useEffect, useState } from "react";

function AccountPage() {
  const { activeAccount} = useKeylessAccounts();
  const { account } = useAptosWallet();
  const [accountAddress, setAccountAddress] = useState<any>();
  const [balance, setBalance] = useState<any>();

  useEffect(()=>{
    if (activeAccount?.accountAddress) {setAccountAddress(activeAccount?.accountAddress)}
    else if (account?.address) {setAccountAddress(account?.address)}
  },[activeAccount,account])

  useEffect(()=>{
    accountAddress && getBalance(accountAddress).then((res)=>{
      setBalance(res/10**8);
    });
  },[accountAddress])

  let pk = new Ed25519PrivateKey(process.env.NEXT_PUBLIC_PRIVATE_KEY!)
  const alice = Account.fromPrivateKey({privateKey:pk})
  const aptos = new Aptos(new AptosConfig({network: Network.TESTNET}))
  const fundacc = async () =>{
    console.log("called")
    const transaction = await aptos.transferCoinTransaction({
      sender: alice.accountAddress,
      recipient: accountAddress,
      amount: 1_000_000,
    });
    const pendingTxn = await aptos.signAndSubmitTransaction({
      signer: alice,
      transaction,
    });
    
    getBalance(accountAddress).then((res)=>{
      setBalance(res/10**8);
    });
    console.log("sent to", accountAddress ,"\n",pendingTxn)
  }

  return (
    <div className="h-full">
      <h1 className="text-xl font-bold">My Account</h1>
      <Card className="h-40 p-4 mt-2 flex flex-col gap-3  rounded-2xl">
        
          <h2
                className={cn(
                  " text-xs  font-semibold ",
                  unbounded.className
                )}
              >
               {activeAccount?.accountAddress
                ? collapseAddress(activeAccount.accountAddress.toString())
                :account?.address ? collapseAddress(account?.address): 
                "Not Connected"}
          </h2>
        <h1 className="text-xl font-bold">{balance} APT</h1>
        {/* <Badge> */}
        {/* </Badge> */}
      </Card>
      <div className="mt-4 mb-4">
        <h1 className="text-xl font-bold">Recent Bets</h1>
      </div>
      <MatchCardsProfile />
      <Button className="mt-8" onClick={fundacc}> get fund</Button>
    </div>
  );
}

export default AccountPage;
