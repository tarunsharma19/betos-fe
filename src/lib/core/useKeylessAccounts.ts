import {
  EphemeralKeyPair,
  KeylessAccount,
  ProofFetchStatus,
} from "@aptos-labs/ts-sdk";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LocalStorageKeys, devnetClient } from "./constants";
import { validateIdToken } from "./idToken";
import {
  EphemeralKeyPairEncoding,
  isValidEphemeralKeyPair,
  validateEphemeralKeyPair,
} from "./ephemeral";
import { EncryptedScopedIdToken } from "./types";
import { KeylessAccountEncoding, validateKeylessAccount } from "./keyless";

interface KeylessAccountsState {
  accounts: {
    idToken: { decoded: EncryptedScopedIdToken; raw: string };
    pepper: Uint8Array;
  }[];
  activeAccount?: KeylessAccount;
  ephemeralKeyPair?: EphemeralKeyPair;
}

interface KeylessAccountsActions {
  commitEphemeralKeyPair: (account: EphemeralKeyPair) => void;
  disconnectKeylessAccount: () => void;
  getEphemeralKeyPair: () => EphemeralKeyPair | undefined;
  switchKeylessAccount: (
    idToken: string
  ) => Promise<KeylessAccount | undefined>;
}

const storage =
  typeof window !== "undefined"
    ? createJSONStorage<KeylessAccountsState>(() => localStorage, {
        replacer: (_, e) => {
          if (typeof e === "bigint")
            return { __type: "bigint", value: e.toString() };
          if (e instanceof Uint8Array)
            return { __type: "Uint8Array", value: Array.from(e) };
          if (e instanceof EphemeralKeyPair)
            return EphemeralKeyPairEncoding.encode(e);
          if (e instanceof KeylessAccount)
            return KeylessAccountEncoding.encode(e);
          return e;
        },
        reviver: (_, e: any) => {
          if (e && e.__type === "bigint") return BigInt(e.value);
          if (e && e.__type === "Uint8Array") return new Uint8Array(e.value);
          if (e && e.__type === "EphemeralKeyPair")
            return EphemeralKeyPairEncoding.decode(e);
          if (e && e.__type === "KeylessAccount")
            return KeylessAccountEncoding.decode(e);
          return e;
        },
      })
    : undefined;

export const useKeylessAccounts = create<
  KeylessAccountsState & KeylessAccountsActions
>()(
  persist(
    (set, get, store) => ({
      ...({ accounts: [] } satisfies KeylessAccountsState),
      commitEphemeralKeyPair: (keyPair) => {
        const valid = isValidEphemeralKeyPair(keyPair);
        if (!valid)
          throw new Error(
            "addEphemeralKeyPair: Invalid ephemeral key pair provided"
          );
        set({ ephemeralKeyPair: keyPair });
      },

      disconnectKeylessAccount: () => set({ activeAccount: undefined }),

      getEphemeralKeyPair: () => {
        const account = get().ephemeralKeyPair;
        return account ? validateEphemeralKeyPair(account) : undefined;
      },

      switchKeylessAccount: async (idToken: string) => {
        set({ ...get(), activeAccount: undefined }, true);

        const decodedToken = validateIdToken(idToken);
        if (!decodedToken) {
          throw new Error(
            "switchKeylessAccount: Invalid idToken provided, could not decode"
          );
        }

        const ephemeralKeyPair = get().getEphemeralKeyPair();
        if (
          !ephemeralKeyPair ||
          ephemeralKeyPair?.nonce !== decodedToken.nonce
        ) {
          throw new Error("switchKeylessAccount: Ephemeral key pair not found");
        }

        const proofFetchCallback = async (res: ProofFetchStatus) => {
          if (res.status === "Failed") {
            get().disconnectKeylessAccount();
          } else {
            store.persist.rehydrate();
          }
        };

        const storedAccount = get().accounts.find(
          (a) => a.idToken.decoded.sub === decodedToken.sub
        );
        let activeAccount: KeylessAccount | undefined;
        try {
          activeAccount = await devnetClient.deriveKeylessAccount({
            ephemeralKeyPair,
            jwt: idToken,
            proofFetchCallback,
          });
        } catch (error) {
          if (!storedAccount?.pepper) throw error;
          activeAccount = await devnetClient.deriveKeylessAccount({
            ephemeralKeyPair,
            jwt: idToken,
            pepper: storedAccount.pepper,
            proofFetchCallback,
          });
        }

        const { pepper } = activeAccount;
        set({
          accounts: storedAccount
            ? get().accounts.map((a) =>
                a.idToken.decoded.sub === decodedToken.sub
                  ? {
                      idToken: { decoded: decodedToken, raw: idToken },
                      pepper,
                    }
                  : a
              )
            : [
                ...get().accounts,
                { idToken: { decoded: decodedToken, raw: idToken }, pepper },
              ],
          activeAccount,
        });

        return activeAccount;
      },
    }),
    {
      merge: (persistedState, currentState) => {
        const merged = { ...currentState, ...(persistedState as object) };
        return {
          ...merged,
          activeAccount:
            merged.activeAccount &&
            validateKeylessAccount(merged.activeAccount),
          ephemeralKeyPair:
            merged.ephemeralKeyPair &&
            validateEphemeralKeyPair(merged.ephemeralKeyPair),
        };
      },
      name: LocalStorageKeys.keylessAccounts,
      partialize: ({ activeAccount, ephemeralKeyPair, ...state }) => ({
        ...state,
        activeAccount: activeAccount && validateKeylessAccount(activeAccount),
        ephemeralKeyPair:
          ephemeralKeyPair && validateEphemeralKeyPair(ephemeralKeyPair),
      }),
      storage,
      version: 1,
    }
  )
);
