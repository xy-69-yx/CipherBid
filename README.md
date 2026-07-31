# CipherBid

CipherBid is a sealed-bid auction contract for Midnight: bids remain committed
until reveal, while the winning bid can be verified.

Each auction accepts up to eight bids. `seeAllBids` and `finalizeAuction` use a
fixed eight-slot reveal batch; use `bidId = 0` for unused slots.

## Browser deployment on Preview

CipherBid follows the browser deployment pattern from
[`tusharpamnani/midnight-skills-counter-dapp`](https://github.com/tusharpamnani/midnight-skills-counter-dapp).
The 1AM browser extension supplies the wallet, balancing, proving, and
transaction submission providers. There is no funded server wallet and no
local proof server in the deployment flow.

Prerequisites:

- Node.js 22 or newer
- The [1AM browser extension](https://1am.xyz), configured for Midnight Preview
- The Compact compiler only when regenerating the contract bundle

Run the app:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the full CipherBid dashboard, or
[http://localhost:3000/deploy](http://localhost:3000/deploy) for the focused deploy flow. Then:

1. Connect 1AM. CipherBid requests the `preview` network explicitly.
2. Click **Deploy CipherBid** and approve the extension flow.
3. Keep the page open while 1AM proves and submits the transaction.
4. Copy the contract address and transaction link shown in the success panel.

The full dashboard also includes live contract snapshot loading and the on-chain
auction actions for create, bid, reveal, finalize, update, and delete.

## Contract generation

The Compact source is [`contracts/cipherbid.compact`](contracts/cipherbid.compact).
To regenerate its TypeScript bundle and browser proving assets:

```bash
npm run compile
npm run sync:assets
```

The generated `contract-info.json` is the source of truth for the Compact
runtime version. This project pins `@midnight-ntwrk/compact-runtime` to the
bundle's runtime version rather than forcing an incompatible generated bundle.

## Build

```bash
npm run build
```

The deploy route is client-side. It creates the unproven deploy transaction in
the browser, obtains the proving provider from 1AM, balances through 1AM, and
submits through 1AM.
