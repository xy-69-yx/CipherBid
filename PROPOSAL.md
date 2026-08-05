# CipherBid Product Proposal

## Product and users

CipherBid is a sealed-bid auction dApp from the approved **Sealed-Bid Auction — private bids, verifiable winner** idea. It lets an organizer open an auction, lets bidders submit bids without showing amounts to competitors, and lets the contract verify reveals and select the highest valid bid.

Primary users are communities, small organizations, digital marketplaces, and procurement teams that need transparent winner selection without leaking live bid prices. Organizers gain verifiable settlement; bidders avoid the strategic disadvantage created by visible bids.

## Why Midnight

A public chain can make settlement auditable, but publishing every bid during an auction changes bidder behavior and enables copying or last-moment undercutting. A private database hides bids but asks every participant to trust its operator.

Midnight gives CipherBid both properties: Compact circuits enforce auction rules and prove correct state transitions, while zero-knowledge proofs keep witness data private until the chosen reveal step. Commitments bind each bidder to one amount without putting that amount on the public ledger during bidding. Selective disclosure then reveals only data required to validate and settle the auction.

## Data model

### Public ledger state

- Global auction and bid counters.
- Auction ID, organizer pseudonym, reserve price, closing timestamp, status, and bid count.
- Bid ID, auction ID, bidder pseudonym, and domain-separated bid commitment.
- After finalization: revealed bid amounts, winning amount, winning bid ID, and winner pseudonym.

### Private witness data

- Browser-local 32-byte `localSk`, used to derive organizer and bidder pseudonyms.
- Bid amount before reveal.
- Random 32-byte bid nonce/private bid key.

The raw `localSk` and bid nonce are never stored in public contract state. During bidding, public bid records contain `amount = 0` and only the commitment. Contract tests verify these privacy properties.

### Disclosure policy

- Auction configuration and pseudonymous participation are public.
- Bid amounts stay hidden throughout bidding.
- Reveal data is accepted only when auction ID, amount, and nonce reproduce the stored commitment.
- Finalization discloses verified amounts needed to calculate a publicly checkable winner.
- Raw browser secrets remain private throughout the auction lifecycle.

## Scope through Level 6 Mainnet readiness

Current Level 3 scope is deliberately small: one shared contract, a maximum of eight bids per auction, create-and-bid frontend flows, Compact contract tests, and CI for compile, test, and production build.

Planned path:

1. **Level 4:** add organizer reveal/finalize UI, bidder recovery guidance, explicit auction phases, and stronger transaction feedback.
2. **Level 5:** enforce deadlines from ledger time, expand authorization and negative-path tests, run end-to-end wallet flows, complete accessibility and mobile QA, and obtain an external contract review.
3. **Level 6:** deploy audited release artifacts to the supported Mainnet environment, publish reproducible deployment details, add monitoring and incident procedures, and document migration or pause strategy.

Mainnet scope remains feasible because CipherBid avoids payments, escrow, unlimited bid sets, and arbitrary auction types in the initial release. Those features stay out of scope until the core private auction lifecycle is tested and independently reviewed.
