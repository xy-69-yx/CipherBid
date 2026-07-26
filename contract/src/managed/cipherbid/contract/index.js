import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var AuctionStatus;
(function (AuctionStatus) {
  AuctionStatus[AuctionStatus['DRAFT'] = 0] = 'DRAFT';
  AuctionStatus[AuctionStatus['OPEN'] = 1] = 'OPEN';
  AuctionStatus[AuctionStatus['CLOSED'] = 2] = 'CLOSED';
  AuctionStatus[AuctionStatus['DELETED'] = 3] = 'DELETED';
})(AuctionStatus || (AuctionStatus = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_1 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_2 = __compactRuntime.CompactTypeBoolean;

class _BidView_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment())))));
  }
  fromValue(value_0) {
    return {
      bidId: _descriptor_0.fromValue(value_0),
      auctionId: _descriptor_0.fromValue(value_0),
      bidder: _descriptor_1.fromValue(value_0),
      amount: _descriptor_0.fromValue(value_0),
      commitment: _descriptor_1.fromValue(value_0),
      revealed: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bidId).concat(_descriptor_0.toValue(value_0.auctionId).concat(_descriptor_1.toValue(value_0.bidder).concat(_descriptor_0.toValue(value_0.amount).concat(_descriptor_1.toValue(value_0.commitment).concat(_descriptor_2.toValue(value_0.revealed))))));
  }
}

const _descriptor_3 = new _BidView_0();

const _descriptor_4 = new __compactRuntime.CompactTypeEnum(3, 1);

class _AuctionRecord_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))))));
  }
  fromValue(value_0) {
    return {
      organizer: _descriptor_1.fromValue(value_0),
      reservePrice: _descriptor_0.fromValue(value_0),
      status: _descriptor_4.fromValue(value_0),
      highestBid: _descriptor_0.fromValue(value_0),
      winnerBidId: _descriptor_0.fromValue(value_0),
      winnerBidder: _descriptor_1.fromValue(value_0),
      bidCount: _descriptor_0.fromValue(value_0),
      endAt: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.organizer).concat(_descriptor_0.toValue(value_0.reservePrice).concat(_descriptor_4.toValue(value_0.status).concat(_descriptor_0.toValue(value_0.highestBid).concat(_descriptor_0.toValue(value_0.winnerBidId).concat(_descriptor_1.toValue(value_0.winnerBidder).concat(_descriptor_0.toValue(value_0.bidCount).concat(_descriptor_0.toValue(value_0.endAt))))))));
  }
}

const _descriptor_5 = new _AuctionRecord_0();

class _BidRevealInput_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment())));
  }
  fromValue(value_0) {
    return {
      bidId: _descriptor_0.fromValue(value_0),
      auctionId: _descriptor_0.fromValue(value_0),
      amount: _descriptor_0.fromValue(value_0),
      nonce: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bidId).concat(_descriptor_0.toValue(value_0.auctionId).concat(_descriptor_0.toValue(value_0.amount).concat(_descriptor_1.toValue(value_0.nonce))));
  }
}

const _descriptor_6 = new _BidRevealInput_0();

const _descriptor_7 = new __compactRuntime.CompactTypeVector(8, _descriptor_6);

class _WinnerTally_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment()));
  }
  fromValue(value_0) {
    return {
      highestBid: _descriptor_0.fromValue(value_0),
      winnerBidId: _descriptor_0.fromValue(value_0),
      winnerBidder: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.highestBid).concat(_descriptor_0.toValue(value_0.winnerBidId).concat(_descriptor_1.toValue(value_0.winnerBidder)));
  }
}

const _descriptor_8 = new _WinnerTally_0();

const _descriptor_9 = new __compactRuntime.CompactTypeVector(8, _descriptor_3);

class _BidRecord_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment()))));
  }
  fromValue(value_0) {
    return {
      auctionId: _descriptor_0.fromValue(value_0),
      bidder: _descriptor_1.fromValue(value_0),
      commitment: _descriptor_1.fromValue(value_0),
      amount: _descriptor_0.fromValue(value_0),
      revealed: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.auctionId).concat(_descriptor_1.toValue(value_0.bidder).concat(_descriptor_1.toValue(value_0.commitment).concat(_descriptor_0.toValue(value_0.amount).concat(_descriptor_2.toValue(value_0.revealed)))));
  }
}

const _descriptor_10 = new _BidRecord_0();

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_12 = new __compactRuntime.CompactTypeVector(4, _descriptor_1);

const _descriptor_13 = new __compactRuntime.CompactTypeVector(2, _descriptor_1);

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_1.fromValue(value_0),
      right: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_1.toValue(value_0.left).concat(_descriptor_1.toValue(value_0.right)));
  }
}

const _descriptor_14 = new _Either_0();

const _descriptor_15 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bytes);
  }
}

const _descriptor_16 = new _ContractAddress_0();

const _descriptor_17 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.localSk) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named localSk');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      createAuction: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`createAuction: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const reservePrice_0 = args_1[1];
        const endAt_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createAuction',
                                     'argument 1 (as invoked from Typescript)',
                                     'cipherbid.compact line 80 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(reservePrice_0) === 'bigint' && reservePrice_0 >= 0n && reservePrice_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createAuction',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'cipherbid.compact line 80 char 1',
                                     'Uint<0..18446744073709551616>',
                                     reservePrice_0)
        }
        if (!(typeof(endAt_0) === 'bigint' && endAt_0 >= 0n && endAt_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createAuction',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'cipherbid.compact line 80 char 1',
                                     'Uint<0..18446744073709551616>',
                                     endAt_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(reservePrice_0).concat(_descriptor_0.toValue(endAt_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createAuction_0(context,
                                               partialProofData,
                                               reservePrice_0,
                                               endAt_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getAuction: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getAuction: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const auctionId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getAuction',
                                     'argument 1 (as invoked from Typescript)',
                                     'cipherbid.compact line 104 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(auctionId_0) === 'bigint' && auctionId_0 >= 0n && auctionId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('getAuction',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'cipherbid.compact line 104 char 1',
                                     'Uint<0..18446744073709551616>',
                                     auctionId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(auctionId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getAuction_0(context,
                                            partialProofData,
                                            auctionId_0);
        partialProofData.output = { value: _descriptor_5.toValue(result_0), alignment: _descriptor_5.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      updateAuction: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`updateAuction: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const auctionId_0 = args_1[1];
        const reservePrice_0 = args_1[2];
        const endAt_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('updateAuction',
                                     'argument 1 (as invoked from Typescript)',
                                     'cipherbid.compact line 110 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(auctionId_0) === 'bigint' && auctionId_0 >= 0n && auctionId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('updateAuction',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'cipherbid.compact line 110 char 1',
                                     'Uint<0..18446744073709551616>',
                                     auctionId_0)
        }
        if (!(typeof(reservePrice_0) === 'bigint' && reservePrice_0 >= 0n && reservePrice_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('updateAuction',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'cipherbid.compact line 110 char 1',
                                     'Uint<0..18446744073709551616>',
                                     reservePrice_0)
        }
        if (!(typeof(endAt_0) === 'bigint' && endAt_0 >= 0n && endAt_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('updateAuction',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'cipherbid.compact line 110 char 1',
                                     'Uint<0..18446744073709551616>',
                                     endAt_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(auctionId_0).concat(_descriptor_0.toValue(reservePrice_0).concat(_descriptor_0.toValue(endAt_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._updateAuction_0(context,
                                               partialProofData,
                                               auctionId_0,
                                               reservePrice_0,
                                               endAt_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      deleteAuction: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`deleteAuction: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const auctionId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('deleteAuction',
                                     'argument 1 (as invoked from Typescript)',
                                     'cipherbid.compact line 131 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(auctionId_0) === 'bigint' && auctionId_0 >= 0n && auctionId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('deleteAuction',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'cipherbid.compact line 131 char 1',
                                     'Uint<0..18446744073709551616>',
                                     auctionId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(auctionId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._deleteAuction_0(context,
                                               partialProofData,
                                               auctionId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      bid: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`bid: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const auctionId_0 = args_1[1];
        const amount_0 = args_1[2];
        const nonce_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('bid',
                                     'argument 1 (as invoked from Typescript)',
                                     'cipherbid.compact line 145 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(auctionId_0) === 'bigint' && auctionId_0 >= 0n && auctionId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('bid',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'cipherbid.compact line 145 char 1',
                                     'Uint<0..18446744073709551616>',
                                     auctionId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('bid',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'cipherbid.compact line 145 char 1',
                                     'Uint<0..18446744073709551616>',
                                     amount_0)
        }
        if (!(nonce_0.buffer instanceof ArrayBuffer && nonce_0.BYTES_PER_ELEMENT === 1 && nonce_0.length === 32)) {
          __compactRuntime.typeError('bid',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'cipherbid.compact line 145 char 1',
                                     'Bytes<32>',
                                     nonce_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(auctionId_0).concat(_descriptor_0.toValue(amount_0).concat(_descriptor_1.toValue(nonce_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._bid_0(context,
                                     partialProofData,
                                     auctionId_0,
                                     amount_0,
                                     nonce_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getBid: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getBid: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const bidId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getBid',
                                     'argument 1 (as invoked from Typescript)',
                                     'cipherbid.compact line 182 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(bidId_0) === 'bigint' && bidId_0 >= 0n && bidId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('getBid',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'cipherbid.compact line 182 char 1',
                                     'Uint<0..18446744073709551616>',
                                     bidId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(bidId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getBid_0(context, partialProofData, bidId_0);
        partialProofData.output = { value: _descriptor_10.toValue(result_0), alignment: _descriptor_10.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      updateBid: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`updateBid: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const bidId_0 = args_1[1];
        const amount_0 = args_1[2];
        const nonce_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('updateBid',
                                     'argument 1 (as invoked from Typescript)',
                                     'cipherbid.compact line 188 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(bidId_0) === 'bigint' && bidId_0 >= 0n && bidId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('updateBid',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'cipherbid.compact line 188 char 1',
                                     'Uint<0..18446744073709551616>',
                                     bidId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('updateBid',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'cipherbid.compact line 188 char 1',
                                     'Uint<0..18446744073709551616>',
                                     amount_0)
        }
        if (!(nonce_0.buffer instanceof ArrayBuffer && nonce_0.BYTES_PER_ELEMENT === 1 && nonce_0.length === 32)) {
          __compactRuntime.typeError('updateBid',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'cipherbid.compact line 188 char 1',
                                     'Bytes<32>',
                                     nonce_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(bidId_0).concat(_descriptor_0.toValue(amount_0).concat(_descriptor_1.toValue(nonce_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._updateBid_0(context,
                                           partialProofData,
                                           bidId_0,
                                           amount_0,
                                           nonce_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      deleteBid: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`deleteBid: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const bidId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('deleteBid',
                                     'argument 1 (as invoked from Typescript)',
                                     'cipherbid.compact line 212 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(bidId_0) === 'bigint' && bidId_0 >= 0n && bidId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('deleteBid',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'cipherbid.compact line 212 char 1',
                                     'Uint<0..18446744073709551616>',
                                     bidId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(bidId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._deleteBid_0(context, partialProofData, bidId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      seeAllBids: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`seeAllBids: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const auctionId_0 = args_1[1];
        const reveals_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('seeAllBids',
                                     'argument 1 (as invoked from Typescript)',
                                     'cipherbid.compact line 291 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(auctionId_0) === 'bigint' && auctionId_0 >= 0n && auctionId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('seeAllBids',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'cipherbid.compact line 291 char 1',
                                     'Uint<0..18446744073709551616>',
                                     auctionId_0)
        }
        if (!(Array.isArray(reveals_0) && reveals_0.length === 8 && reveals_0.every((t) => typeof(t) === 'object' && typeof(t.bidId) === 'bigint' && t.bidId >= 0n && t.bidId <= 18446744073709551615n && typeof(t.auctionId) === 'bigint' && t.auctionId >= 0n && t.auctionId <= 18446744073709551615n && typeof(t.amount) === 'bigint' && t.amount >= 0n && t.amount <= 18446744073709551615n && t.nonce.buffer instanceof ArrayBuffer && t.nonce.BYTES_PER_ELEMENT === 1 && t.nonce.length === 32))) {
          __compactRuntime.typeError('seeAllBids',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'cipherbid.compact line 291 char 1',
                                     'Vector<8, struct BidRevealInput<bidId: Uint<0..18446744073709551616>, auctionId: Uint<0..18446744073709551616>, amount: Uint<0..18446744073709551616>, nonce: Bytes<32>>>',
                                     reveals_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(auctionId_0).concat(_descriptor_7.toValue(reveals_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_7.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._seeAllBids_0(context,
                                            partialProofData,
                                            auctionId_0,
                                            reveals_0);
        partialProofData.output = { value: _descriptor_9.toValue(result_0), alignment: _descriptor_9.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      finalizeAuction: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`finalizeAuction: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const auctionId_0 = args_1[1];
        const reveals_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('finalizeAuction',
                                     'argument 1 (as invoked from Typescript)',
                                     'cipherbid.compact line 309 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(auctionId_0) === 'bigint' && auctionId_0 >= 0n && auctionId_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('finalizeAuction',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'cipherbid.compact line 309 char 1',
                                     'Uint<0..18446744073709551616>',
                                     auctionId_0)
        }
        if (!(Array.isArray(reveals_0) && reveals_0.length === 8 && reveals_0.every((t) => typeof(t) === 'object' && typeof(t.bidId) === 'bigint' && t.bidId >= 0n && t.bidId <= 18446744073709551615n && typeof(t.auctionId) === 'bigint' && t.auctionId >= 0n && t.auctionId <= 18446744073709551615n && typeof(t.amount) === 'bigint' && t.amount >= 0n && t.amount <= 18446744073709551615n && t.nonce.buffer instanceof ArrayBuffer && t.nonce.BYTES_PER_ELEMENT === 1 && t.nonce.length === 32))) {
          __compactRuntime.typeError('finalizeAuction',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'cipherbid.compact line 309 char 1',
                                     'Vector<8, struct BidRevealInput<bidId: Uint<0..18446744073709551616>, auctionId: Uint<0..18446744073709551616>, amount: Uint<0..18446744073709551616>, nonce: Bytes<32>>>',
                                     reveals_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(auctionId_0).concat(_descriptor_7.toValue(reveals_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_7.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._finalizeAuction_0(context,
                                                 partialProofData,
                                                 auctionId_0,
                                                 reveals_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      createAuction: this.circuits.createAuction,
      getAuction: this.circuits.getAuction,
      updateAuction: this.circuits.updateAuction,
      deleteAuction: this.circuits.deleteAuction,
      bid: this.circuits.bid,
      getBid: this.circuits.getBid,
      updateBid: this.circuits.updateBid,
      deleteBid: this.circuits.deleteBid,
      seeAllBids: this.circuits.seeAllBids,
      finalizeAuction: this.circuits.finalizeAuction
    };
    this.provableCircuits = {
      createAuction: this.circuits.createAuction,
      getAuction: this.circuits.getAuction,
      updateAuction: this.circuits.updateAuction,
      deleteAuction: this.circuits.deleteAuction,
      bid: this.circuits.bid,
      getBid: this.circuits.getBid,
      updateBid: this.circuits.updateBid,
      deleteBid: this.circuits.deleteBid,
      seeAllBids: this.circuits.seeAllBids,
      finalizeAuction: this.circuits.finalizeAuction
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('createAuction', new __compactRuntime.ContractOperation());
    state_0.setOperation('getAuction', new __compactRuntime.ContractOperation());
    state_0.setOperation('updateAuction', new __compactRuntime.ContractOperation());
    state_0.setOperation('deleteAuction', new __compactRuntime.ContractOperation());
    state_0.setOperation('bid', new __compactRuntime.ContractOperation());
    state_0.setOperation('getBid', new __compactRuntime.ContractOperation());
    state_0.setOperation('updateBid', new __compactRuntime.ContractOperation());
    state_0.setOperation('deleteBid', new __compactRuntime.ContractOperation());
    state_0.setOperation('seeAllBids', new __compactRuntime.ContractOperation());
    state_0.setOperation('finalizeAuction', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(0n),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(1n),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(2n),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(3n),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(0n),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(1n),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(2n),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(3n),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_12, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_13, value_0);
    return result_0;
  }
  _localSk_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.localSk(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('localSk',
                                 'return value',
                                 'cipherbid.compact line 58 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _getDappPubKey_0(_sk_0) {
    return this._persistentHash_1([new Uint8Array([99, 105, 112, 104, 101, 114, 98, 105, 100, 58, 112, 107, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   _sk_0]);
  }
  _bidCommitment_0(auctionId_0, amount_0, nonce_0) {
    return this._persistentHash_0([new Uint8Array([99, 105, 112, 104, 101, 114, 98, 105, 100, 58, 98, 105, 100, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        auctionId_0,
                                                                        'cipherbid.compact line 74 char 5'),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        amount_0,
                                                                        'cipherbid.compact line 75 char 5'),
                                   nonce_0]);
  }
  _createAuction_0(context, partialProofData, reservePrice_0, endAt_0) {
    const _sk_0 = this._localSk_0(context, partialProofData);
    const organizer_0 = this._getDappPubKey_0(_sk_0);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(0n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_11.toValue(tmp_0),
                                                                alignment: _descriptor_11.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    const auctionId_0 = _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_17.toValue(0n),
                                                                                                              alignment: _descriptor_17.alignment() } }] } },
                                                                                   { popeq: { cached: true,
                                                                                              result: undefined } }]).value);
    const tmp_1 = { organizer: organizer_0,
                    reservePrice: reservePrice_0,
                    status: 1,
                    highestBid: 0n,
                    winnerBidId: 0n,
                    winnerBidder: organizer_0,
                    bidCount: 0n,
                    endAt: endAt_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(2n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(auctionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_1),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return auctionId_0;
  }
  _getAuction_0(context, partialProofData, auctionId_0) {
    const disclosedAuctionId_0 = auctionId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_17.toValue(2n),
                                                                                                                  alignment: _descriptor_17.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Auction not found');
    return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_17.toValue(2n),
                                                                                                 alignment: _descriptor_17.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _updateAuction_0(context,
                   partialProofData,
                   auctionId_0,
                   reservePrice_0,
                   endAt_0)
  {
    const disclosedAuctionId_0 = auctionId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_17.toValue(2n),
                                                                                                                  alignment: _descriptor_17.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Auction not found');
    const _sk_0 = this._localSk_0(context, partialProofData);
    const organizer_0 = this._getDappPubKey_0(_sk_0);
    const auction_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_17.toValue(2n),
                                                                                                            alignment: _descriptor_17.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(this._equal_0(auction_0.organizer, organizer_0),
                            'Only the organizer can update the auction');
    __compactRuntime.assert(auction_0.status === 1, 'Auction is not open');
    const tmp_0 = { organizer: auction_0.organizer,
                    reservePrice: reservePrice_0,
                    status: auction_0.status,
                    highestBid: auction_0.highestBid,
                    winnerBidId: auction_0.winnerBidId,
                    winnerBidder: auction_0.winnerBidder,
                    bidCount: auction_0.bidCount,
                    endAt: endAt_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(2n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _deleteAuction_0(context, partialProofData, auctionId_0) {
    const disclosedAuctionId_0 = auctionId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_17.toValue(2n),
                                                                                                                  alignment: _descriptor_17.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Auction not found');
    const _sk_0 = this._localSk_0(context, partialProofData);
    const organizer_0 = this._getDappPubKey_0(_sk_0);
    const auction_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_17.toValue(2n),
                                                                                                            alignment: _descriptor_17.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(this._equal_1(auction_0.organizer, organizer_0),
                            'Only the organizer can delete the auction');
    __compactRuntime.assert(this._equal_2(auction_0.bidCount, 0n),
                            'Delete bids first');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(2n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _bid_0(context, partialProofData, auctionId_0, amount_0, nonce_0) {
    const disclosedAuctionId_0 = auctionId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_17.toValue(2n),
                                                                                                                  alignment: _descriptor_17.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Auction not found');
    const auction_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_17.toValue(2n),
                                                                                                            alignment: _descriptor_17.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(auction_0.status === 1, 'Auction is not open');
    let t_0;
    __compactRuntime.assert((t_0 = auction_0.bidCount, t_0 < 8n),
                            'Auction already has the maximum of 8 bids');
    const _sk_0 = this._localSk_0(context, partialProofData);
    const bidder_0 = this._getDappPubKey_0(_sk_0);
    const commitment_0 = this._bidCommitment_0(disclosedAuctionId_0,
                                               amount_0,
                                               nonce_0);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(1n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_11.toValue(tmp_0),
                                                                alignment: _descriptor_11.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    const bidId_0 = _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_17.toValue(1n),
                                                                                                          alignment: _descriptor_17.alignment() } }] } },
                                                                               { popeq: { cached: true,
                                                                                          result: undefined } }]).value);
    const tmp_1 = { auctionId: disclosedAuctionId_0,
                    bidder: bidder_0,
                    commitment: commitment_0,
                    amount: 0n,
                    revealed: false };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(3n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(bidId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(tmp_1),
                                                                                              alignment: _descriptor_10.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_2 = { organizer: auction_0.organizer,
                    reservePrice: auction_0.reservePrice,
                    status: auction_0.status,
                    highestBid: auction_0.highestBid,
                    winnerBidId: auction_0.winnerBidId,
                    winnerBidder: auction_0.winnerBidder,
                    bidCount:
                      ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('cipherbid.compact line 175 char 17: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                        }
                        return t1;
                      })(auction_0.bidCount + 1n),
                    endAt: auction_0.endAt };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(2n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_2),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return bidId_0;
  }
  _getBid_0(context, partialProofData, bidId_0) {
    const disclosedBidId_0 = bidId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_17.toValue(3n),
                                                                                                                  alignment: _descriptor_17.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedBidId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Bid not found');
    return _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_17.toValue(3n),
                                                                                                  alignment: _descriptor_17.alignment() } }] } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_0.toValue(disclosedBidId_0),
                                                                                                  alignment: _descriptor_0.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value);
  }
  _updateBid_0(context, partialProofData, bidId_0, amount_0, nonce_0) {
    const disclosedBidId_0 = bidId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_17.toValue(3n),
                                                                                                                  alignment: _descriptor_17.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedBidId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Bid not found');
    const bid_0 = _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_17.toValue(3n),
                                                                                                         alignment: _descriptor_17.alignment() } }] } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(disclosedBidId_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value);
    let tmp_0;
    const auction_0 = (tmp_0 = bid_0.auctionId,
                       _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_17.toValue(2n),
                                                                                                             alignment: _descriptor_17.alignment() } }] } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_0.toValue(tmp_0),
                                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value));
    __compactRuntime.assert(auction_0.status === 1, 'Auction is not open');
    const _sk_0 = this._localSk_0(context, partialProofData);
    const bidder_0 = this._getDappPubKey_0(_sk_0);
    __compactRuntime.assert(this._equal_3(bid_0.bidder, bidder_0),
                            'Only the bidder can update the bid');
    const tmp_1 = { auctionId: bid_0.auctionId,
                    bidder: bid_0.bidder,
                    commitment:
                      this._bidCommitment_0(bid_0.auctionId, amount_0, nonce_0),
                    amount: 0n,
                    revealed: false };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(3n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedBidId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(tmp_1),
                                                                                              alignment: _descriptor_10.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _deleteBid_0(context, partialProofData, bidId_0) {
    const disclosedBidId_0 = bidId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_17.toValue(3n),
                                                                                                                  alignment: _descriptor_17.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedBidId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Bid not found');
    const bid_0 = _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_17.toValue(3n),
                                                                                                         alignment: _descriptor_17.alignment() } }] } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(disclosedBidId_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value);
    let tmp_0;
    const auction_0 = (tmp_0 = bid_0.auctionId,
                       _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_17.toValue(2n),
                                                                                                             alignment: _descriptor_17.alignment() } }] } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_0.toValue(tmp_0),
                                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value));
    __compactRuntime.assert(auction_0.status === 1, 'Auction is not open');
    const _sk_0 = this._localSk_0(context, partialProofData);
    const bidder_0 = this._getDappPubKey_0(_sk_0);
    __compactRuntime.assert(this._equal_4(bid_0.bidder, bidder_0),
                            'Only the bidder can delete the bid');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(3n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedBidId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = bid_0.auctionId;
    let t_0, t_1;
    const tmp_2 = { organizer: auction_0.organizer,
                    reservePrice: auction_0.reservePrice,
                    status: auction_0.status,
                    highestBid: auction_0.highestBid,
                    winnerBidId: auction_0.winnerBidId,
                    winnerBidder: auction_0.winnerBidder,
                    bidCount:
                      (t_0 = auction_0.bidCount,
                       (t_1 = 1n,
                        (__compactRuntime.assert(t_0 >= t_1,
                                                 'result of subtraction would be negative'),
                         t_0 - t_1))),
                    endAt: auction_0.endAt };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(2n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_2),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _verifyAndRevealBid_0(context, partialProofData, reveal_0) {
    const bidId_0 = reveal_0.bidId;
    const auctionId_0 = reveal_0.auctionId;
    const amount_0 = reveal_0.amount;
    if (this._equal_5(bidId_0, 0n)) {
      return { bidId: 0n, auctionId: 0n, bidder: new Uint8Array(32), amount: 0n, commitment: new Uint8Array(32), revealed: false };
    } else {
      __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                        partialProofData,
                                                                                        [
                                                                                         { dup: { n: 0 } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_17.toValue(3n),
                                                                                                                    alignment: _descriptor_17.alignment() } }] } },
                                                                                         { push: { storage: false,
                                                                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(bidId_0),
                                                                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                                                                         'member',
                                                                                         { popeq: { cached: true,
                                                                                                    result: undefined } }]).value),
                              'Bid not found');
      const bid_0 = _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_17.toValue(3n),
                                                                                                           alignment: _descriptor_17.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_0.toValue(bidId_0),
                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value);
      __compactRuntime.assert(this._equal_6(bid_0.auctionId, auctionId_0),
                              'Reveal does not match the bid');
      const auction_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_17.toValue(2n),
                                                                                                              alignment: _descriptor_17.alignment() } }] } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_0.toValue(auctionId_0),
                                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value);
      __compactRuntime.assert(auction_0.status === 1,
                              'Auction is not ready for reveal');
      const expectedCommitment_0 = this._bidCommitment_0(auctionId_0,
                                                         amount_0,
                                                         reveal_0.nonce);
      __compactRuntime.assert(this._equal_7(bid_0.commitment,
                                            expectedCommitment_0),
                              'Reveal does not match commitment');
      const tmp_0 = { auctionId: bid_0.auctionId,
                      bidder: bid_0.bidder,
                      commitment: bid_0.commitment,
                      amount: amount_0,
                      revealed: true };
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_17.toValue(3n),
                                                                    alignment: _descriptor_17.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(bidId_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(tmp_0),
                                                                                                alignment: _descriptor_10.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 1 } }]);
      return { bidId: bidId_0,
               auctionId: auctionId_0,
               bidder: bid_0.bidder,
               amount: amount_0,
               commitment: bid_0.commitment,
               revealed: true };
    }
  }
  _pickWinner_0(current_0, bid_0) {
    if (this._equal_8(bid_0.bidId, 0n)) {
      return current_0;
    } else {
      let t_0;
      if (t_0 = bid_0.amount, t_0 > current_0.highestBid) {
        return { highestBid: bid_0.amount,
                 winnerBidId: bid_0.bidId,
                 winnerBidder: bid_0.bidder };
      } else {
        return current_0;
      }
    }
  }
  _seeAllBids_0(context, partialProofData, auctionId_0, reveals_0) {
    const disclosedAuctionId_0 = auctionId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_17.toValue(2n),
                                                                                                                  alignment: _descriptor_17.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Auction not found');
    const _sk_0 = this._localSk_0(context, partialProofData);
    const organizer_0 = this._getDappPubKey_0(_sk_0);
    const auction_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_17.toValue(2n),
                                                                                                            alignment: _descriptor_17.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(this._equal_9(auction_0.organizer, organizer_0),
                            'Only the organizer can inspect bids');
    __compactRuntime.assert(auction_0.status === 1, 'Auction is not open');
    return this._mapper_0(context,
                          partialProofData,
                          (...args_0) => this._verifyAndRevealBid_0(...args_0),
                          reveals_0);
  }
  _countRevealed_0(current_0, bid_0) {
    if (this._equal_10(bid_0.bidId, 0n)) {
      return current_0;
    } else {
      return ((t1) => {
               if (t1 > 18446744073709551615n) {
                 throw new __compactRuntime.CompactError('cipherbid.compact line 306 char 37: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
               }
               return t1;
             })(current_0 + 1n);
    }
  }
  _finalizeAuction_0(context, partialProofData, auctionId_0, reveals_0) {
    const disclosedAuctionId_0 = auctionId_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_17.toValue(2n),
                                                                                                                  alignment: _descriptor_17.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Auction not found');
    const _sk_0 = this._localSk_0(context, partialProofData);
    const organizer_0 = this._getDappPubKey_0(_sk_0);
    const auction_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_17.toValue(2n),
                                                                                                            alignment: _descriptor_17.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(this._equal_11(auction_0.organizer, organizer_0),
                            'Only the organizer can finalize the auction');
    __compactRuntime.assert(auction_0.status === 1, 'Auction is not open');
    let t_0;
    __compactRuntime.assert((t_0 = auction_0.bidCount, t_0 > 0n),
                            'Auction has no bids');
    const disclosedBids_0 = this._seeAllBids_0(context,
                                               partialProofData,
                                               disclosedAuctionId_0,
                                               reveals_0);
    const revealedCount_0 = this._folder_0((...args_0) =>
                                             this._countRevealed_0(...args_0),
                                           0n,
                                           disclosedBids_0);
    __compactRuntime.assert(this._equal_12(revealedCount_0, auction_0.bidCount),
                            'Reveal every bid before finalizing');
    const tally_0 = this._folder_1((...args_1) => this._pickWinner_0(...args_1),
                                   { highestBid: 0n,
                                     winnerBidId: 0n,
                                     winnerBidder: organizer_0 },
                                   disclosedBids_0);
    let t_1;
    __compactRuntime.assert((t_1 = tally_0.highestBid,
                             t_1 >= auction_0.reservePrice),
                            'Reserve price was not met');
    const tmp_0 = { organizer: auction_0.organizer,
                    reservePrice: auction_0.reservePrice,
                    status: 2,
                    highestBid: tally_0.highestBid,
                    winnerBidId: tally_0.winnerBidId,
                    winnerBidder: tally_0.winnerBidder,
                    bidCount: auction_0.bidCount,
                    endAt: auction_0.endAt };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_17.toValue(2n),
                                                                  alignment: _descriptor_17.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(disclosedAuctionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _mapper_0(context, partialProofData, f, a0) {
    let a = [];
    for (let i = 0; i < 8; i++) { a[i] = f(context, partialProofData, a0[i]); }
    return a;
  }
  _equal_10(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_11(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_0(f, x, a0) {
    for (let i = 0; i < 8; i++) { x = f(x, a0[i]); }
    return x;
  }
  _equal_12(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _folder_1(f, x, a0) {
    for (let i = 0; i < 8; i++) { x = f(x, a0[i]); }
    return x;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ localSk: (...args) => undefined });
export const pureCircuits = {};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
