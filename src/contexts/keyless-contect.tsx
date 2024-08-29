"use client";
import { KeylessAccount } from "@aptos-labs/ts-sdk";
import React, { createContext, useState, useContext } from "react";


interface KeylessAccountContextProps {
  keylessAcc: KeylessAccount | null;
  setKeylessAcc: React.Dispatch<React.SetStateAction<KeylessAccount | null>>;
}

const KeylessAccountContext = createContext<KeylessAccountContextProps | undefined>(undefined);

export const KeylessAccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [keylessAcc, setKeylessAcc] = useState<KeylessAccount | null>(null);

  return (
    <KeylessAccountContext.Provider value={{ keylessAcc, setKeylessAcc }}>
      {children}
    </KeylessAccountContext.Provider>
  );
};

export const useKeylessAccount = (): KeylessAccountContextProps => {
  const context = useContext(KeylessAccountContext);
  if (!context) {
    throw new Error("useKeylessAccount must be used within a KeylessAccountProvider");
  }
  return context;
};
