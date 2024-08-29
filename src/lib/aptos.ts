import {
  AccountAddress,
  Aptos,
  AptosConfig,
  Network,
} from "@aptos-labs/ts-sdk";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

const APTOS_NETWORK: Network = Network.TESTNET;
const config = new AptosConfig({ network: APTOS_NETWORK });
export const aptos = new Aptos(config);

export const getBalance = async (
  accountAddress: AccountAddress
): Promise<number> => {
  const amount = await aptos.getAccountAPTAmount({
    accountAddress,
  });
  console.log(`Balance is: ${amount}`);
  return amount;
};

export const fetchResource = async (accountAddress: string): Promise<any> => {
  const moduleAddress =
    "0xe5179e22928c1ddb72d9fadc60209fcde24d3e01f37f161396f35caf618e8b08";
  console.log(`${moduleAddress}::betos::Markets`);
  try {
    const resource = await aptos.getAccountResource({
      accountAddress:
        "0xe5179e22928c1ddb72d9fadc60209fcde24d3e01f37f161396f35caf618e8b08",
      resourceType: `0xe5179e22928c1ddb72d9fadc60209fcde24d3e01f37f161396f35caf618e8b08::betos::Markets`,
    });
    console.log("Fetched resource:", resource);
    return resource.data;
  } catch (error) {
    console.error("Error fetching resource:", error);
    return null;
  }
};

export const placeBet = async (
  accountAddress: AccountAddress,
  signAndSubmitTransaction: (transaction: InputTransactionData) => Promise<any>,
  betDetails: {
    address: string;
    fixtureId: number;
    option: number;
    amount: number;
  }
): Promise<boolean> => {
  const moduleAddress =
    "0xe5179e22928c1ddb72d9fadc60209fcde24d3e01f37f161396f35caf618e8b08";

  const transaction: InputTransactionData = {
    data: {
      function: `${moduleAddress}::betos::place_prediction`,
      functionArguments: [
        betDetails.address, // address of the target
        moduleAddress, // module address
        betDetails.fixtureId, // ID of the fixture
        betDetails.option, // selected option (home/away/draw, etc.)
        betDetails.amount, // bet amount
      ],
    },
  };

  try {
    const response = await signAndSubmitTransaction(transaction);
    console.log("Transaction response:", response);

    await aptos.waitForTransaction({ transactionHash: response.hash });
    console.log("Transaction confirmed:", response.hash);

    return true; // Bet placed successfully
  } catch (error) {
    console.error("Error placing bet:", error);
    return false; // Bet failed
  }
};
