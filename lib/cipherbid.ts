"use client";

import { sampleSigningKey } from "@midnight-ntwrk/compact-runtime";
import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { createUnprovenDeployTx, submitTxAsync } from "@midnight-ntwrk/midnight-js-contracts";
import { SucceedEntirely } from "@midnight-ntwrk/midnight-js-types";
import { Cipherbid, createInitialPrivateState, witnesses } from "@contract/index";
import type { ConnectedSession } from "./midnight";

export const PRIVATE_STATE_ID = "cipherbidPrivateState";
export const CIPHERBID_ZK_ASSET_PATH = "/zk/cipherbid/";

export function makeCompiledContract() {
  return CompiledContract.make("cipherbid", Cipherbid.Contract).pipe(
    CompiledContract.withWitnesses(witnesses),
    CompiledContract.withCompiledFileAssets(CIPHERBID_ZK_ASSET_PATH),
  );
}

export type DeployCipherBidResult = {
  contractAddress: string;
  txId: string;
};

export async function deployCipherBid(session: ConnectedSession): Promise<DeployCipherBidResult> {
  const compiledContract = makeCompiledContract();
  const deployTxData = await createUnprovenDeployTx(
    {
      zkConfigProvider: session.providers.zkConfigProvider,
      walletProvider: session.providers.walletProvider,
    } as never,
    {
      compiledContract,
      args: [],
      privateStateId: PRIVATE_STATE_ID,
      initialPrivateState: createInitialPrivateState(),
      signingKey: sampleSigningKey(),
    } as never,
  );

  const contractAddress = deployTxData.public.contractAddress;
  const txId = await submitTxAsync(session.providers as never, {
    unprovenTx: deployTxData.private.unprovenTx,
  } as never);

  const finalizedTx = await session.providers.publicDataProvider.watchForTxData(txId);
  if (finalizedTx.status !== SucceedEntirely) {
    throw new Error(`Deployment finalized with status ${finalizedTx.status}.`);
  }

  session.providers.privateStateProvider.setContractAddress(contractAddress);
  await session.providers.privateStateProvider.set(
    PRIVATE_STATE_ID,
    deployTxData.private.initialPrivateState,
  );
  await session.providers.privateStateProvider.setSigningKey(
    contractAddress,
    deployTxData.private.signingKey,
  );

  return { contractAddress, txId };
}
