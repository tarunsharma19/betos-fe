import { AccountAddress, Aptos, AptosConfig, NetworkToNetworkName } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";


const APTOS_NETWORK: Network = Network.TESTNET;
const config = new AptosConfig({ network: APTOS_NETWORK });
export const aptos = new Aptos(config);

export const getBalance = async (
    accountAddress: AccountAddress,
  ): Promise<number> => {
    const amount = await aptos.getAccountAPTAmount({
      accountAddress,
    });
    console.log(`balance is: ${amount}`);
    return amount;
  };
