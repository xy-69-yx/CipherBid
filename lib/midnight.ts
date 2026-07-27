"use client";

import { ContractState } from "@midnight-ntwrk/compact-runtime";
import { LedgerParameters, ZswapChainState } from "@midnight-ntwrk/ledger-v8";
import { FetchZkConfigProvider } from "@midnight-ntwrk/midnight-js-fetch-zk-config-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import type { MidnightProvider, WalletProvider } from "@midnight-ntwrk/midnight-js-types";

export const PREVIEW_NETWORK_ID = "preview";

export function selectPreviewNetwork(): void {
  setNetworkId(PREVIEW_NETWORK_ID);
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex: string): Uint8Array {
  const normalized = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (normalized.length % 2 !== 0) {
    throw new Error("The wallet returned an invalid hexadecimal transaction.");
  }

  const bytes = new Uint8Array(normalized.length / 2);
  for (let index = 0; index < normalized.length; index += 2) {
    bytes[index / 2] = Number.parseInt(normalized.slice(index, index + 2), 16);
  }
  return bytes;
}

type WalletApi = {
  getConfiguration(): Promise<{
    networkId: string;
    indexerUri: string;
    indexerWsUri: string;
  }>;
  getUnshieldedAddress(): Promise<{ unshieldedAddress: string }>;
  getShieldedAddresses(): Promise<{
    shieldedCoinPublicKey: string;
    shieldedEncryptionPublicKey: string;
  }>;
  getProvingProvider(provider: unknown): Promise<unknown>;
  balanceUnsealedTransaction(tx: string): Promise<{ tx?: string }>;
  submitTransaction(
    tx: string,
  ): Promise<string | { transactionId?: string; id?: string } | null | undefined>;
};

type OneAmWallet = {
  connect(networkId: typeof PREVIEW_NETWORK_ID): Promise<WalletApi>;
};

declare global {
  interface Window {
    midnight?: {
      "1am"?: OneAmWallet;
    };
  }
}

function createPrivateStateProvider() {
  let contractAddress = "";
  const states = new Map<string, unknown>();
  const signingKeys = new Map<string, unknown>();
  const scopedKey = (id: string) => `${contractAddress}:${id}`;

  return {
    setContractAddress(address: string) {
      contractAddress = address;
    },
    async set(id: string, state: unknown) {
      states.set(scopedKey(id), state);
    },
    async get(id: string) {
      return states.get(scopedKey(id)) ?? null;
    },
    async remove(id: string) {
      states.delete(scopedKey(id));
    },
    async clear() {
      states.clear();
    },
    async setSigningKey(address: string, key: unknown) {
      signingKeys.set(address, key);
    },
    async getSigningKey(address: string) {
      return signingKeys.get(address) ?? null;
    },
    async removeSigningKey(address: string) {
      signingKeys.delete(address);
    },
    async clearSigningKeys() {
      signingKeys.clear();
    },
    async exportPrivateStates(): Promise<never> {
      throw new Error("Private-state export is not implemented.");
    },
    async importPrivateStates(): Promise<never> {
      throw new Error("Private-state import is not implemented.");
    },
    async exportSigningKeys(): Promise<never> {
      throw new Error("Signing-key export is not implemented.");
    },
    async importSigningKeys(): Promise<never> {
      throw new Error("Signing-key import is not implemented.");
    },
  };
}

function createPatchedPublicDataProvider(queryUrl: string, subscriptionUrl: string) {
  const base = indexerPublicDataProvider(queryUrl, subscriptionUrl);

  async function queryLatest(query: string, address: string) {
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query, variables: { address } }),
    });
    if (!response.ok) {
      throw new Error(`Indexer request failed with ${response.status}.`);
    }
    const payload = await response.json();
    if (payload.errors?.length) {
      throw new Error(payload.errors.map((error: { message: string }) => error.message).join("; "));
    }
    return payload.data?.contractAction ?? null;
  }

  return {
    ...base,
    async queryContractState(contractAddress: string, config?: unknown) {
      if (config) {
        return base.queryContractState(contractAddress, config as never);
      }
      const action = await queryLatest(
        `query LATEST_CONTRACT_STATE($address: HexEncoded!) {
          contractAction(address: $address) { state }
        }`,
        contractAddress,
      );
      return action ? ContractState.deserialize(fromHex(action.state)) : null;
    },
    async queryZSwapAndContractState(contractAddress: string, config?: unknown) {
      if (config) {
        return base.queryZSwapAndContractState(contractAddress, config as never);
      }
      const action = await queryLatest(
        `query LATEST_BOTH_STATE($address: HexEncoded!) {
          contractAction(address: $address) {
            state
            zswapState
            transaction { block { ledgerParameters } }
          }
        }`,
        contractAddress,
      );
      if (!action?.zswapState) {
        return null;
      }
      return [
        ZswapChainState.deserialize(fromHex(action.zswapState)),
        ContractState.deserialize(fromHex(action.state)),
        action.transaction?.block?.ledgerParameters
          ? LedgerParameters.deserialize(fromHex(action.transaction.block.ledgerParameters))
          : LedgerParameters.initialParameters(),
      ] as const;
    },
  };
}

export type ConnectedSession = {
  api: WalletApi;
  config: Awaited<ReturnType<WalletApi["getConfiguration"]>>;
  unshieldedAddress: string;
  providers: {
    privateStateProvider: ReturnType<typeof createPrivateStateProvider>;
    publicDataProvider: ReturnType<typeof createPatchedPublicDataProvider>;
    zkConfigProvider: FetchZkConfigProvider<string>;
    proofProvider: { proveTx(unprovenTx: { prove(provider: unknown, costModel: unknown): Promise<unknown> }): Promise<unknown> };
    walletProvider: WalletProvider;
    midnightProvider: MidnightProvider;
  };
};

export async function detectOneAmWallet(): Promise<OneAmWallet | null> {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const wallet = window.midnight?.["1am"];
    if (wallet) {
      return wallet;
    }
    await new Promise((resolve) => window.setTimeout(resolve, 100));
  }
  return null;
}

export async function connectPreviewWallet(zkAssetBasePath: string): Promise<ConnectedSession> {
  selectPreviewNetwork();

  const wallet = await detectOneAmWallet();
  if (!wallet) {
    throw new Error("1AM wallet was not detected. Install the extension and refresh this page.");
  }

  const api = await wallet.connect(PREVIEW_NETWORK_ID);
  const config = await api.getConfiguration();
  if (config.networkId !== PREVIEW_NETWORK_ID) {
    throw new Error(`1AM connected to ${config.networkId}; switch the wallet to Preview and try again.`);
  }

  setNetworkId(config.networkId);
  const [unshieldedAddress, shieldedAddress] = await Promise.all([
    api.getUnshieldedAddress(),
    api.getShieldedAddresses(),
  ]);

  const zkConfigProvider = new FetchZkConfigProvider(
    new URL(zkAssetBasePath, window.location.origin).toString(),
    window.fetch.bind(window),
  );
  const provingProvider = await api.getProvingProvider(zkConfigProvider);

  const proofProvider = {
    async proveTx(unprovenTx: { prove(provider: unknown, costModel: unknown): Promise<unknown> }) {
      const { CostModel } = await import("@midnight-ntwrk/ledger-v8");
      return unprovenTx.prove(provingProvider, CostModel.initialCostModel());
    },
  };

  const walletProvider: WalletProvider = {
    getCoinPublicKey: () => shieldedAddress.shieldedCoinPublicKey,
    getEncryptionPublicKey: () => shieldedAddress.shieldedEncryptionPublicKey,
    balanceTx: async (transaction: { serialize(): Uint8Array }) => {
      const balanced = await api.balanceUnsealedTransaction(toHex(transaction.serialize()));
      if (!balanced.tx) {
        throw new Error("1AM did not return a balanced transaction.");
      }
      const { Transaction } = await import("@midnight-ntwrk/ledger-v8");
      return Transaction.deserialize("signature", "proof", "binding", fromHex(balanced.tx));
    },
  };

  const midnightProvider: MidnightProvider = {
    submitTx: async (transaction: { serialize(): Uint8Array }) => {
      const serialized = toHex(transaction.serialize());
      const result = await api.submitTransaction(serialized);
      if (typeof result === "string") {
        return result || serialized.slice(0, 64);
      }
      return result?.transactionId ?? result?.id ?? serialized.slice(0, 64);
    },
  };

  return {
    api,
    config,
    unshieldedAddress: unshieldedAddress.unshieldedAddress,
    providers: {
      privateStateProvider: createPrivateStateProvider(),
      publicDataProvider: createPatchedPublicDataProvider(config.indexerUri, config.indexerWsUri),
      zkConfigProvider,
      proofProvider,
      walletProvider,
      midnightProvider,
    },
  };
}
