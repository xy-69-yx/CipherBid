"use client";

import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { type FinalizedTxData } from "@midnight-ntwrk/midnight-js-types";
import { Cipherbid, createInitialPrivateState, witnesses } from "@contract/index";
import type { ConnectedSession } from "./midnight";

export const CIPHERBID_CONTRACT_ADDRESS =
  "92ba0c6e876224955ab29bd3cb527bb4b4c99a6e03df189236118c2e79367b48";
export const PRIVATE_STATE_ID = "cipherbidPrivateState";
export const CIPHERBID_ZK_ASSET_PATH = "/zk/cipherbid/";

const PRIVATE_KEY_STORAGE = `cipherbid.privateKey.${CIPHERBID_CONTRACT_ADDRESS}`;
const FINALITY_TIMEOUT_MS = 3 * 60 * 1000;

export function makeCompiledContract() {
  return CompiledContract.make("cipherbid", Cipherbid.Contract).pipe(
    CompiledContract.withWitnesses(witnesses),
    CompiledContract.withCompiledFileAssets(CIPHERBID_ZK_ASSET_PATH),
  );
}

function privateStateForBrowser() {
  const stored = window.localStorage.getItem(PRIVATE_KEY_STORAGE);
  if (stored && /^[0-9a-f]{64}$/i.test(stored)) {
    return {
      localSk: Uint8Array.from(stored.match(/.{2}/g) ?? [], (byte) =>
        Number.parseInt(byte, 16),
      ),
    };
  }

  const state = createInitialPrivateState();
  const encoded = Array.from(state.localSk, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  window.localStorage.setItem(PRIVATE_KEY_STORAGE, encoded);
  return state;
}

export async function prepareCipherBidSession(session: ConnectedSession) {
  session.providers.privateStateProvider.setContractAddress(CIPHERBID_CONTRACT_ADDRESS);
  await session.providers.privateStateProvider.set(
    PRIVATE_STATE_ID,
    privateStateForBrowser(),
  );
}

export async function waitForTxFinality(
  session: ConnectedSession,
  txId: string,
): Promise<FinalizedTxData> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(
        new Error(
          `Transaction ${txId} was submitted, but Preview did not confirm it within 3 minutes. Check it in the 1AM Explorer before trying again.`,
        ),
      );
    }, FINALITY_TIMEOUT_MS);
  });

  try {
    return await Promise.race([
      session.providers.publicDataProvider.watchForTxData(txId),
      timeout,
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
