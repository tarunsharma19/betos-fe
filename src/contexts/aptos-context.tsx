"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export interface ResourceData {
  key: string;
  value: {
    admin: string;
    expiry: string;
    fixture_id: string;
    predictions: Prediction[];
    status: number;
  };
}

export interface Prediction {
  fixture_id: string;
  odds: string;
  outcome: string;
  user: string;
  wager: string;
}

interface AptosContextProps {
  aptos: Aptos;
  resourceData: ResourceData[];
  fetchResourceData: () => Promise<void>;
}

const AptosContext = createContext<AptosContextProps | undefined>(undefined);

export const AptosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { account } = useWallet();
  const [aptos] = useState(() => {
    const config = new AptosConfig({ network: Network.TESTNET });
    return new Aptos(config);
  });
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);

  const fetchResourceData = React.useCallback(async () => {
    if (!account) return;
    const moduleAddress =
      "0xe5179e22928c1ddb72d9fadc60209fcde24d3e01f37f161396f35caf618e8b08";
    try {
      const resource = await aptos.getAccountResource({
        accountAddress: moduleAddress,
        resourceType: `${moduleAddress}::betos::Markets`, // Replace with actual module and resource names
      });
      if (resource) {
        setResourceData(resource._id.data as ResourceData[]);
      }
    } catch (e: any) {
      setResourceData([]);
    }
  }, [account, aptos]);

  useEffect(() => {
    if (account?.address) {
      fetchResourceData();
    }
  }, [account?.address, fetchResourceData]);

  return (
    <AptosContext.Provider value={{ aptos, resourceData, fetchResourceData }}>
      {children}
    </AptosContext.Provider>
  );
};

export const useAptos = (): AptosContextProps => {
  const context = useContext(AptosContext);
  if (!context) {
    throw new Error("useAptos must be used within an AptosProvider");
  }
  return context;
};
