import {
  AccountAddress,
  Aptos,
  AptosConfig,
  Network,
} from "@aptos-labs/ts-sdk";

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
      accountAddress: "0xe5179e22928c1ddb72d9fadc60209fcde24d3e01f37f161396f35caf618e8b08",
      resourceType: `0xe5179e22928c1ddb72d9fadc60209fcde24d3e01f37f161396f35caf618e8b08::betos::Markets`,
    });
    console.log("Fetched resource:", resource);
    return resource.data;
  } catch (error) {
    console.error("Error fetching resource:", error);
    return null;
  }
};
