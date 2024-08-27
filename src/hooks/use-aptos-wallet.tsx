import { useCallback } from "react";
import { useWallet, WalletName } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";

// Custom hook to manage Aptos wallet interaction
export const useAptosWallet = () => {
  const {
    connect,
    disconnect,
    signAndSubmitTransaction,
    changeNetwork,
    connected,
    wallet,
    account,
    isLoading,
  } = useWallet();

  // Handle wallet connection
  const handleConnect = useCallback(
    async (walletName: WalletName) => {
      try {
        await connect(walletName);
        console.log("Connected to wallet:", account?.address);
      } catch (error: any) {
        console.error("Failed to connect to wallet:", error.message);
      }
    },
    [connect, account]
  );

  // Handle wallet disconnection
  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      console.log("Disconnected from wallet");
    } catch (error: any) {
      console.error("Failed to disconnect from wallet:", error.message);
    }
  }, [disconnect]);

  // Handle network change
  const handleChangeNetwork = useCallback(
    async (networkName: Network) => {
      try {
        await changeNetwork(networkName);
        console.log("Network changed to:", networkName);
      } catch (error: any) {
        console.error("Failed to change network:", error.message);
      }
    },
    [changeNetwork]
  );

  // Handle transaction signing and submission
  const handleSignAndSubmit = useCallback(
    async (transactionData: any) => {
      if (!account) {
        throw new Error("No account connected for transaction.");
      }

      try {
        const response = await signAndSubmitTransaction({
          sender: account.address,
          data: transactionData,
        });
        console.log("Transaction successful:", response);
      } catch (error: any) {
        console.error("Failed to sign and submit transaction:", error.message);
      }
    },
    [signAndSubmitTransaction, account]
  );

  return {
    connected,
    isLoading,
    walletName: wallet?.name,
    account,
    handleConnect,
    handleDisconnect,
    handleChangeNetwork,
    handleSignAndSubmit,
  };
};
