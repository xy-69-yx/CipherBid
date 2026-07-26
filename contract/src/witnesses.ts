import type { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import type { Cipherbid } from "./index";

export type CipherBidPrivateState = {
  localSk: Uint8Array;
};

export const witnesses = {
  localSk(
    context: WitnessContext<Cipherbid.Ledger, CipherBidPrivateState>,
  ): [CipherBidPrivateState, Uint8Array] {
    return [context.privateState, context.privateState.localSk];
  },
};

export function createInitialPrivateState(): CipherBidPrivateState {
  return {
    localSk: crypto.getRandomValues(new Uint8Array(32)),
  };
}
