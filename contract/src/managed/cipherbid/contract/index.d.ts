import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum AuctionStatus { DRAFT = 0, OPEN = 1, CLOSED = 2, DELETED = 3 }

export type AuctionRecord = { organizer: Uint8Array;
                              reservePrice: bigint;
                              status: AuctionStatus;
                              highestBid: bigint;
                              winnerBidId: bigint;
                              winnerBidder: Uint8Array;
                              bidCount: bigint;
                              endAt: bigint
                            };

export type BidRecord = { auctionId: bigint;
                          bidder: Uint8Array;
                          commitment: Uint8Array;
                          amount: bigint;
                          revealed: boolean
                        };

export type BidRevealInput = { bidId: bigint;
                               auctionId: bigint;
                               amount: bigint;
                               nonce: Uint8Array
                             };

export type BidView = { bidId: bigint;
                        auctionId: bigint;
                        bidder: Uint8Array;
                        amount: bigint;
                        commitment: Uint8Array;
                        revealed: boolean
                      };

export type WinnerTally = { highestBid: bigint;
                            winnerBidId: bigint;
                            winnerBidder: Uint8Array
                          };

export type Witnesses<PS> = {
  localSk(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  createAuction(context: __compactRuntime.CircuitContext<PS>,
                reservePrice_0: bigint,
                endAt_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  getAuction(context: __compactRuntime.CircuitContext<PS>, auctionId_0: bigint): __compactRuntime.CircuitResults<PS, AuctionRecord>;
  updateAuction(context: __compactRuntime.CircuitContext<PS>,
                auctionId_0: bigint,
                reservePrice_0: bigint,
                endAt_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  deleteAuction(context: __compactRuntime.CircuitContext<PS>,
                auctionId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  bid(context: __compactRuntime.CircuitContext<PS>,
      auctionId_0: bigint,
      amount_0: bigint,
      nonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  getBid(context: __compactRuntime.CircuitContext<PS>, bidId_0: bigint): __compactRuntime.CircuitResults<PS, BidRecord>;
  updateBid(context: __compactRuntime.CircuitContext<PS>,
            bidId_0: bigint,
            amount_0: bigint,
            nonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  deleteBid(context: __compactRuntime.CircuitContext<PS>, bidId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  seeAllBids(context: __compactRuntime.CircuitContext<PS>,
             auctionId_0: bigint,
             reveals_0: BidRevealInput[]): __compactRuntime.CircuitResults<PS, BidView[]>;
  finalizeAuction(context: __compactRuntime.CircuitContext<PS>,
                  auctionId_0: bigint,
                  reveals_0: BidRevealInput[]): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  createAuction(context: __compactRuntime.CircuitContext<PS>,
                reservePrice_0: bigint,
                endAt_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  getAuction(context: __compactRuntime.CircuitContext<PS>, auctionId_0: bigint): __compactRuntime.CircuitResults<PS, AuctionRecord>;
  updateAuction(context: __compactRuntime.CircuitContext<PS>,
                auctionId_0: bigint,
                reservePrice_0: bigint,
                endAt_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  deleteAuction(context: __compactRuntime.CircuitContext<PS>,
                auctionId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  bid(context: __compactRuntime.CircuitContext<PS>,
      auctionId_0: bigint,
      amount_0: bigint,
      nonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  getBid(context: __compactRuntime.CircuitContext<PS>, bidId_0: bigint): __compactRuntime.CircuitResults<PS, BidRecord>;
  updateBid(context: __compactRuntime.CircuitContext<PS>,
            bidId_0: bigint,
            amount_0: bigint,
            nonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  deleteBid(context: __compactRuntime.CircuitContext<PS>, bidId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  seeAllBids(context: __compactRuntime.CircuitContext<PS>,
             auctionId_0: bigint,
             reveals_0: BidRevealInput[]): __compactRuntime.CircuitResults<PS, BidView[]>;
  finalizeAuction(context: __compactRuntime.CircuitContext<PS>,
                  auctionId_0: bigint,
                  reveals_0: BidRevealInput[]): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  createAuction(context: __compactRuntime.CircuitContext<PS>,
                reservePrice_0: bigint,
                endAt_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  getAuction(context: __compactRuntime.CircuitContext<PS>, auctionId_0: bigint): __compactRuntime.CircuitResults<PS, AuctionRecord>;
  updateAuction(context: __compactRuntime.CircuitContext<PS>,
                auctionId_0: bigint,
                reservePrice_0: bigint,
                endAt_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  deleteAuction(context: __compactRuntime.CircuitContext<PS>,
                auctionId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  bid(context: __compactRuntime.CircuitContext<PS>,
      auctionId_0: bigint,
      amount_0: bigint,
      nonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  getBid(context: __compactRuntime.CircuitContext<PS>, bidId_0: bigint): __compactRuntime.CircuitResults<PS, BidRecord>;
  updateBid(context: __compactRuntime.CircuitContext<PS>,
            bidId_0: bigint,
            amount_0: bigint,
            nonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  deleteBid(context: __compactRuntime.CircuitContext<PS>, bidId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  seeAllBids(context: __compactRuntime.CircuitContext<PS>,
             auctionId_0: bigint,
             reveals_0: BidRevealInput[]): __compactRuntime.CircuitResults<PS, BidView[]>;
  finalizeAuction(context: __compactRuntime.CircuitContext<PS>,
                  auctionId_0: bigint,
                  reveals_0: BidRevealInput[]): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
