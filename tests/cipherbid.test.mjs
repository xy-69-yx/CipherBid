import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  createCircuitContext,
  createConstructorContext,
  dummyContractAddress,
} from "@midnight-ntwrk/compact-runtime";

import {
  AuctionStatus,
  Contract,
} from "../contract/src/managed/cipherbid/contract/index.js";

const ZERO_BYTES = new Uint8Array(32);
const COIN_PUBLIC_KEY = { bytes: new Uint8Array(32).fill(7) };

const privateState = (byte) => ({ localSk: new Uint8Array(32).fill(byte) });
const nonce = (byte) => new Uint8Array(32).fill(byte);

const witnesses = {
  localSk(context) {
    return [context.privateState, context.privateState.localSk];
  },
};

function createHarness(secretByte = 1) {
  const contract = new Contract(witnesses);
  const initial = privateState(secretByte);
  const state = contract.initialState(
    createConstructorContext(initial, COIN_PUBLIC_KEY),
  );

  let context = createCircuitContext(
    dummyContractAddress(),
    state.currentZswapLocalState,
    state.currentContractState,
    initial,
  );

  return {
    contract,
    get context() {
      return context;
    },
    call(circuit, ...args) {
      const result = contract.circuits[circuit](context, ...args);
      context = result.context;
      return result;
    },
  };
}

function emptyReveal() {
  return {
    bidId: 0n,
    auctionId: 0n,
    amount: 0n,
    nonce: ZERO_BYTES,
  };
}

function revealBatch(...reveals) {
  return [...reveals, ...Array.from({ length: 8 - reveals.length }, emptyReveal)];
}

describe("CipherBid Compact contract", () => {
  test("circuit binds reveal amount and nonce to original commitment", () => {
    const app = createHarness();
    const auctionId = app.call("createAuction", 50n, 2_000_000_000n).result;
    const bidId = app.call("bid", auctionId, 75n, nonce(11)).result;

    assert.throws(
      () =>
        app.call(
          "seeAllBids",
          auctionId,
          revealBatch({ bidId, auctionId, amount: 76n, nonce: nonce(11) }),
        ),
      /Reveal does not match commitment/,
    );

    assert.throws(
      () =>
        app.call(
          "seeAllBids",
          auctionId,
          revealBatch({ bidId, auctionId, amount: 75n, nonce: nonce(12) }),
        ),
      /Reveal does not match commitment/,
    );
  });

  test("ledger transitions from open auction to finalized winner", () => {
    const app = createHarness();
    const auctionId = app.call("createAuction", 50n, 2_000_000_000n).result;
    const firstBidId = app.call("bid", auctionId, 75n, nonce(21)).result;
    const secondBidId = app.call("bid", auctionId, 90n, nonce(22)).result;

    const openAuction = app.call("getAuction", auctionId).result;
    assert.equal(openAuction.status, AuctionStatus.OPEN);
    assert.equal(openAuction.bidCount, 2n);

    app.call(
      "finalizeAuction",
      auctionId,
      revealBatch(
        { bidId: firstBidId, auctionId, amount: 75n, nonce: nonce(21) },
        { bidId: secondBidId, auctionId, amount: 90n, nonce: nonce(22) },
      ),
    );

    const closedAuction = app.call("getAuction", auctionId).result;
    assert.equal(closedAuction.status, AuctionStatus.CLOSED);
    assert.equal(closedAuction.highestBid, 90n);
    assert.equal(closedAuction.winnerBidId, secondBidId);
  });

  test("private bid amount, nonce, and local secret stay out of public bid state", () => {
    const app = createHarness(31);
    const secretNonce = nonce(41);
    const privateAmount = 123_456n;
    const auctionId = app.call("createAuction", 1n, 2_000_000_000n).result;
    const bidId = app.call("bid", auctionId, privateAmount, secretNonce).result;

    const publicBid = app.call("getBid", bidId).result;
    assert.equal(publicBid.amount, 0n);
    assert.equal(publicBid.revealed, false);
    assert.equal("nonce" in publicBid, false);
    assert.equal("localSk" in publicBid, false);
    assert.notDeepEqual(publicBid.commitment, secretNonce);
    assert.notDeepEqual(publicBid.bidder, privateState(31).localSk);
  });
});
