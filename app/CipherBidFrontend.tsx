"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { submitCallTxAsync } from "@midnight-ntwrk/midnight-js-contracts";
import { SucceedEntirely } from "@midnight-ntwrk/midnight-js-types";
import { CIPHERBID_ZK_ASSET_PATH, deployCipherBid, makeCompiledContract, PRIVATE_STATE_ID } from "@/lib/cipherbid";
import {
  connectPreviewWallet,
  detectOneAmWallet,
  selectPreviewNetwork,
  type ConnectedSession,
} from "@/lib/midnight";

type Mode = "full" | "deploy";

type Activity = {
  id: number;
  title: string;
  detail: string;
  txId?: string;
  status: "working" | "done" | "error";
};

type RevealRow = {
  bidId: string;
  auctionId: string;
  amount: string;
  nonce: string;
};

const STORAGE_CONTRACT_ADDRESS = "cipherbid.contractAddress";
const compiledContract = makeCompiledContract();

function randomHex32() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function makeDefaultEndAt() {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
  return tomorrow.toISOString().slice(0, 16);
}

function dateToUnix(value: string, label: string) {
  const milliseconds = new Date(value).getTime();
  if (!value || Number.isNaN(milliseconds)) {
    throw new Error(`${label} must be a valid date and time.`);
  }
  return BigInt(Math.floor(milliseconds / 1000));
}

function loadStoredContractAddress() {
  if (typeof window === "undefined") {
    return "";
  }
  return window.localStorage.getItem(STORAGE_CONTRACT_ADDRESS) ?? "";
}

function hexToBytes(value: string) {
  const normalized = value.trim().replace(/^0x/, "");
  if (normalized.length % 2 !== 0) {
    throw new Error("Hex values must contain an even number of characters.");
  }
  const bytes = new Uint8Array(normalized.length / 2);
  for (let index = 0; index < normalized.length; index += 2) {
    bytes[index / 2] = Number.parseInt(normalized.slice(index, index + 2), 16);
  }
  return bytes;
}

function truncate(value: string, front = 8, back = 8) {
  if (value.length <= front + back + 3) {
    return value;
  }
  return `${value.slice(0, front)}...${value.slice(-back)}`;
}

function parseBigIntInput(value: string, label: string): bigint {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${label} is required.`);
  }
  if (!/^\d+$/.test(trimmed)) {
    throw new Error(`${label} must be a whole number.`);
  }
  return BigInt(trimmed);
}

function ensureNonce(value: string): string {
  const normalized = value.trim().replace(/^0x/, "");
  if (!normalized) {
    return randomHex32();
  }
  if (!/^[0-9a-fA-F]{64}$/.test(normalized)) {
    throw new Error("Nonce must be 32 bytes of hex.");
  }
  return normalized.toLowerCase();
}

function buildRevealVector(rows: RevealRow[], fallbackAuctionId: string) {
  return rows.map((row) => {
    const bidId = row.bidId.trim() ? parseBigIntInput(row.bidId, "Reveal bid ID") : BigInt(0);
    const auctionId = row.auctionId.trim()
      ? parseBigIntInput(row.auctionId, "Reveal auction ID")
      : parseBigIntInput(fallbackAuctionId, "Auction ID");
    const amount = row.amount.trim() ? parseBigIntInput(row.amount, "Reveal amount") : BigInt(0);
    const nonce = row.nonce.trim() ? ensureNonce(row.nonce) : "0".repeat(64);
    return { bidId, auctionId, amount, nonce: hexToBytes(nonce) };
  });
}

function Card({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`.trim()}>
      <div className="panel-head">
        {eyebrow && <span className="panel-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <small className="field-hint">{hint}</small>}
    </label>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}

export default function CipherBidFrontend({ mode = "full" }: { mode?: Mode }) {
  const [session, setSession] = useState<ConnectedSession | null>(null);
  const [walletInstalled, setWalletInstalled] = useState<boolean | null>(null);
  const [contractAddress, setContractAddress] = useState(loadStoredContractAddress);
  const [snapshot, setSnapshot] = useState("");
  const [snapshotOps, setSnapshotOps] = useState<string[]>([]);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [currentTxId, setCurrentTxId] = useState("");
  const [activity, setActivity] = useState<Activity[]>([]);
  const [contractTxId, setContractTxId] = useState("");
  const [activeTask, setActiveTask] = useState<"create" | "bid" | "finish">("create");
  const [createReservePrice, setCreateReservePrice] = useState("100");
  const [createEndAt, setCreateEndAt] = useState(makeDefaultEndAt);
  const [auctionId, setAuctionId] = useState("");
  const [manageReservePrice, setManageReservePrice] = useState("100");
  const [manageEndAt, setManageEndAt] = useState(makeDefaultEndAt);
  const [bidAmount, setBidAmount] = useState("0");
  const [bidNonce, setBidNonce] = useState(randomHex32);
  const [bidId, setBidId] = useState("");
  const [bidUpdateAmount, setBidUpdateAmount] = useState("");
  const [bidUpdateNonce, setBidUpdateNonce] = useState(randomHex32);
  const [revealRows, setRevealRows] = useState<RevealRow[]>(
    Array.from({ length: 8 }, () => ({ bidId: "", auctionId: "", amount: "", nonce: "" })),
  );

  useEffect(() => {
    selectPreviewNetwork();
    detectOneAmWallet().then((wallet) => setWalletInstalled(wallet !== null));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !contractAddress) {
      return;
    }
    window.localStorage.setItem(STORAGE_CONTRACT_ADDRESS, contractAddress);
  }, [contractAddress]);

  async function connect() {
    setBusy("Connecting wallet");
    setError("");
    try {
      const connected = await connectPreviewWallet(CIPHERBID_ZK_ASSET_PATH);
      setSession(connected);
      setActivity((items) => [
        {
          id: Date.now(),
          title: "Wallet connected",
          detail: connected.unshieldedAddress,
          status: "done",
        },
        ...items,
      ]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not connect to 1AM.");
    } finally {
      setBusy("");
    }
  }

  async function refreshSnapshot(address = contractAddress) {
    if (!session) {
      throw new Error("Connect 1AM first.");
    }
    if (!address.trim()) {
      throw new Error("Enter a contract address first.");
    }
    const state = await session.providers.publicDataProvider.queryContractState(address.trim());
    if (!state) {
      setSnapshot("");
      setSnapshotOps([]);
      throw new Error("No contract state was found at that address.");
    }
    setSnapshot(state.toString(true));
    setSnapshotOps(state.operations().map((operation) => String(operation)));
    setActivity((items) => [
      {
        id: Date.now(),
        title: "Loaded contract snapshot",
        detail: `Read ${state.operations().length} registered circuits.`,
        status: "done",
      },
      ...items,
    ]);
  }

  async function deploy() {
    if (!session) {
      throw new Error("Connect 1AM first.");
    }
    setBusy("Deploying contract");
    setError("");
    try {
      const result = await deployCipherBid(session);
      setContractAddress(result.contractAddress);
      setContractTxId(result.txId);
      setCurrentTxId(result.txId);
      setActivity((items) => [
        {
          id: Date.now(),
          title: "Contract deployed",
          detail: result.contractAddress,
          txId: result.txId,
          status: "done",
        },
        ...items,
      ]);
      void refreshSnapshot(result.contractAddress).catch(() => undefined);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Contract deployment failed.");
    } finally {
      setBusy("");
    }
  }

  async function submitCallTx(
    circuitId: string,
    args: readonly unknown[],
    activityTitle: string,
    successDetail: string,
  ) {
    if (!session) {
      throw new Error("Connect 1AM first.");
    }
    const address = contractAddress.trim();
    if (!address) {
      throw new Error("Enter a deployed contract address first.");
    }

    setBusy(activityTitle);
    setError("");
    try {
      const submitted = await submitCallTxAsync(session.providers as never, {
        compiledContract: compiledContract as never,
        circuitId: circuitId as never,
        contractAddress: address,
        privateStateId: PRIVATE_STATE_ID,
        args,
      } as never);

      setCurrentTxId(submitted.txId);
      const finalized = await session.providers.publicDataProvider.watchForTxData(submitted.txId);
      if (finalized.status !== SucceedEntirely) {
        throw new Error(`Transaction finalized with status ${finalized.status}.`);
      }

      await session.providers.privateStateProvider.set(
        PRIVATE_STATE_ID,
        submitted.callTxData.private.nextPrivateState,
      );
      setActivity((items) => [
        {
          id: Date.now(),
          title: activityTitle,
          detail: successDetail,
          txId: submitted.txId,
          status: "done",
        },
        ...items,
      ]);
      void refreshSnapshot().catch(() => undefined);
      return submitted;
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : `${activityTitle} failed.`;
      setActivity((items) => [
        {
          id: Date.now(),
          title: activityTitle,
          detail: message,
          status: "error",
        },
        ...items,
      ]);
      throw cause instanceof Error ? cause : new Error(message);
    } finally {
      setBusy("");
    }
  }

  async function createAuction() {
    const submitted = await submitCallTx(
      "createAuction",
      [parseBigIntInput(createReservePrice, "Minimum price"), dateToUnix(createEndAt, "Closing time")] as const,
      "Create auction",
      "Auction opened on chain.",
    );
    const result = submitted.callTxData.private.result;
    setAuctionId(String(result));
  }

  async function updateAuction() {
    await submitCallTx(
      "updateAuction",
      [
        parseBigIntInput(auctionId, "Auction ID"),
        parseBigIntInput(manageReservePrice, "Minimum price"),
        dateToUnix(manageEndAt, "Closing time"),
      ] as const,
      "Update auction",
      "Auction settings updated.",
    );
  }

  async function deleteAuction() {
    await submitCallTx(
      "deleteAuction",
      [parseBigIntInput(auctionId, "Auction ID")] as const,
      "Delete auction",
      "Auction removed.",
    );
  }

  async function placeBid() {
    const nonce = ensureNonce(bidNonce);
    const submitted = await submitCallTx(
      "bid",
      [
        parseBigIntInput(auctionId, "Auction ID"),
        parseBigIntInput(bidAmount, "Bid amount"),
        Uint8Array.from(Buffer.from(nonce, "hex")),
      ] as const,
      "Place bid",
      "Bid committed on chain.",
    );
    const result = submitted.callTxData.private.result;
    setBidId(String(result));
    setBidNonce(nonce);
  }

  async function updateBid() {
    const nonce = ensureNonce(bidUpdateNonce);
    await submitCallTx(
      "updateBid",
      [
        parseBigIntInput(bidId, "Bid ID"),
        parseBigIntInput(bidUpdateAmount, "Updated amount"),
        Uint8Array.from(Buffer.from(nonce, "hex")),
      ] as const,
      "Update bid",
      "Bid commitment updated.",
    );
    setBidUpdateNonce(nonce);
  }

  async function deleteBid() {
    await submitCallTx(
      "deleteBid",
      [parseBigIntInput(bidId, "Bid ID")] as const,
      "Delete bid",
      "Bid removed.",
    );
  }

  async function revealBids() {
    const reveals = buildRevealVector(revealRows, auctionId);
    await submitCallTx(
      "seeAllBids",
      [parseBigIntInput(auctionId, "Auction ID"), reveals] as const,
      "Reveal bids",
      "Organizer reveal completed.",
    );
  }

  async function finalizeAuction() {
    const reveals = buildRevealVector(revealRows, auctionId);
    await submitCallTx(
      "finalizeAuction",
      [parseBigIntInput(auctionId, "Auction ID"), reveals] as const,
      "Finalize auction",
      "Winner recorded on chain.",
    );
  }

  async function copyText(value: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    await navigator.clipboard.writeText(value);
  }

  const explorerLink = currentTxId
    ? `https://explorer.1am.xyz/tx/${currentTxId}?network=preview`
    : "";

  const compact = mode === "deploy";

  if (mode === "full" || mode === "deploy") {
    return (
      <main className={compact ? "studio-shell studio-compact simple-app" : "studio-shell simple-app"}>
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <header className="simple-nav">
          <Link href="/" className="wordmark">CipherBid</Link>
          <Pill><span className="status-dot" /> Midnight Preview</Pill>
        </header>

        <section className="studio-hero simple-hero">
          <span className="plain-eyebrow">{compact ? "One-time setup" : "Private auctions made simple"}</span>
          <h1>{compact ? "Set up CipherBid" : "Bid privately. Prove the winner."}</h1>
          <p className="lede">
            {compact
              ? "Connect your 1AM wallet and approve the setup. Your CipherBid contract will then be ready."
              : "Create an auction or place a sealed bid. Bid amounts stay hidden until the auction ends."}
          </p>
        </section>

        {walletInstalled === false && (
          <div className="notice">
            <strong>1AM wallet is needed.</strong>{" "}
            Install it from <a href="https://1am.xyz" target="_blank" rel="noreferrer">1am.xyz</a>, then reload this page.
          </div>
        )}

        <section className="simple-grid">
          <Card
            eyebrow="Get ready"
            title={contractAddress ? "CipherBid is ready" : "Connect and set up"}
            description={contractAddress
              ? "Your wallet and contract are ready. Choose a task below."
              : "Follow these steps once. 1AM will ask you to approve the wallet actions."}
            className="setup-card panel-feature"
          >
            <div className="simple-steps" aria-label="Setup progress">
              <div className={session ? "simple-step complete" : "simple-step current"}>
                <span>{session ? "✓" : "1"}</span><strong>Connect wallet</strong>
              </div>
              <div className={contractAddress ? "simple-step complete" : session ? "simple-step current" : "simple-step"}>
                <span>{contractAddress ? "✓" : "2"}</span><strong>Set up contract</strong>
              </div>
              <div className={contractAddress ? "simple-step complete" : "simple-step"}>
                <span>{contractAddress ? "✓" : "3"}</span><strong>Start an auction</strong>
              </div>
            </div>

            {!session && walletInstalled !== false && (
              <button className="primary-action" onClick={connect} disabled={busy === "Connecting wallet"}>
                {busy === "Connecting wallet" ? "Waiting for 1AM..." : "Connect 1AM wallet"}
              </button>
            )}
            {session && !contractAddress && (
              <button
                className="primary-action"
                onClick={() => deploy().catch((cause) => setError(cause instanceof Error ? cause.message : "Contract setup failed."))}
                disabled={busy === "Deploying contract"}
              >
                {busy === "Deploying contract" ? "Setting up your contract..." : "Set up CipherBid"}
              </button>
            )}
            {contractAddress && (
              <div className="ready-box" aria-live="polite">
                <div className="ready-copy">
                  <span className="ready-check">✓</span>
                  <div><strong>Ready to use</strong><p>The contract address is saved in this browser.</p></div>
                </div>
                <details className="address-details">
                  <summary>View contract address</summary>
                  <code>{contractAddress}</code>
                  <div className="success-actions">
                    <button onClick={() => copyText(contractAddress).catch(() => undefined)}>Copy address</button>
                    {contractTxId && (
                      <a href={`https://explorer.1am.xyz/tx/${contractTxId}?network=preview`} target="_blank" rel="noreferrer">
                        View setup transaction
                      </a>
                    )}
                  </div>
                </details>
              </div>
            )}
            {session && (
              <p className="connected-note">
                <span className="connected-dot" /> Connected to 1AM on Preview
                <span title={session.unshieldedAddress}>{truncate(session.unshieldedAddress, 6, 6)}</span>
              </p>
            )}
          </Card>

          {!compact && contractAddress && (
            <section className="task-area">
              <div className="task-heading">
                <div><span className="plain-eyebrow">Choose a task</span><h2>What would you like to do?</h2></div>
                <div className="task-tabs" role="tablist" aria-label="Auction tasks">
                  <button className={activeTask === "create" ? "active" : ""} onClick={() => setActiveTask("create")}>Create auction</button>
                  <button className={activeTask === "bid" ? "active" : ""} onClick={() => setActiveTask("bid")}>Place a bid</button>
                  <button className={activeTask === "finish" ? "active" : ""} onClick={() => setActiveTask("finish")}>Finish auction</button>
                </div>
              </div>

              {activeTask === "create" && (
                <Card eyebrow="For auction owners" title="Create a new auction" description="Choose the lowest price you will accept and when bidding should close." className="task-card">
                  <div className="field-grid">
                    <Field label="Minimum price" hint="Use a whole number, for example 100.">
                      <input inputMode="numeric" value={createReservePrice} onChange={(event) => setCreateReservePrice(event.target.value)} />
                    </Field>
                    <Field label="Bidding closes">
                      <input type="datetime-local" value={createEndAt} onChange={(event) => setCreateEndAt(event.target.value)} />
                    </Field>
                  </div>
                  <div className="card-actions">
                    <button className="primary-action" onClick={() => createAuction().catch((cause) => setError(cause instanceof Error ? cause.message : "Auction creation failed."))} disabled={busy === "Create auction"}>
                      {busy === "Create auction" ? "Creating your auction..." : "Create auction"}
                    </button>
                  </div>
                  {auctionId && (
                    <div className="important-result">
                      <span>Auction created</span><p>Share this auction number with bidders.</p>
                      <strong>#{auctionId}</strong>
                      <button onClick={() => copyText(auctionId).catch(() => undefined)}>Copy auction number</button>
                    </div>
                  )}
                </Card>
              )}

              {activeTask === "bid" && (
                <Card eyebrow="For bidders" title="Place a private bid" description="Your amount stays hidden until the auction owner finishes the auction." className="task-card">
                  <div className="field-grid">
                    <Field label="Auction number" hint="Get this from the auction owner.">
                      <input inputMode="numeric" value={auctionId} onChange={(event) => setAuctionId(event.target.value)} placeholder="For example, 1" />
                    </Field>
                    <Field label="Your bid">
                      <input inputMode="numeric" value={bidAmount} onChange={(event) => setBidAmount(event.target.value)} placeholder="Enter a whole number" />
                    </Field>
                  </div>
                  <details className="advanced-inline">
                    <summary>Advanced: private bid key</summary>
                    <Field label="Private bid key" hint="Created automatically. Keep it safe because it is needed later.">
                      <input value={bidNonce} onChange={(event) => setBidNonce(event.target.value)} />
                    </Field>
                    <button className="text-button" onClick={() => setBidNonce(randomHex32())}>Create a new key</button>
                  </details>
                  <div className="card-actions">
                    <button className="primary-action" onClick={() => placeBid().catch((cause) => setError(cause instanceof Error ? cause.message : "Bid failed."))} disabled={busy === "Place bid"}>
                      {busy === "Place bid" ? "Sealing your bid..." : "Place private bid"}
                    </button>
                  </div>
                  {bidId && (
                    <div className="important-result bid-receipt">
                      <span>Bid placed</span><p>Save these details. They are needed when the auction ends.</p>
                      <dl>
                        <div><dt>Bid number</dt><dd>{bidId}</dd></div>
                        <div><dt>Amount</dt><dd>{bidAmount}</dd></div>
                        <div><dt>Private key</dt><dd>{truncate(bidNonce, 10, 10)}</dd></div>
                      </dl>
                      <button onClick={() => copyText(`Auction: ${auctionId}\nBid: ${bidId}\nAmount: ${bidAmount}\nPrivate key: ${bidNonce}`).catch(() => undefined)}>
                        Copy bid details
                      </button>
                    </div>
                  )}
                </Card>
              )}

              {activeTask === "finish" && (
                <Card eyebrow="For auction owners" title="Reveal bids and choose the winner" description="Enter the details sent by each bidder. Leave unused bids empty." className="task-card task-card-wide">
                  <Field label="Auction number">
                    <input inputMode="numeric" value={auctionId} onChange={(event) => setAuctionId(event.target.value)} placeholder="For example, 1" />
                  </Field>
                  <div className="reveal-help"><strong>Bid details</strong><span>Each bid number, amount, and private key must match the bidder&apos;s receipt.</span></div>
                  <div className="simple-reveal-list">
                    {revealRows.map((row, index) => (
                      <details className="simple-reveal" key={index} open={index === 0}>
                        <summary>Bid {index + 1}{row.bidId ? ` · #${row.bidId}` : ""}</summary>
                        <div className="reveal-fields">
                          <input aria-label={`Bid ${index + 1} number`} value={row.bidId} onChange={(event) => {
                            const next = revealRows.slice(); next[index] = { ...next[index], bidId: event.target.value }; setRevealRows(next);
                          }} placeholder="Bid number" />
                          <input aria-label={`Bid ${index + 1} amount`} value={row.amount} onChange={(event) => {
                            const next = revealRows.slice(); next[index] = { ...next[index], amount: event.target.value }; setRevealRows(next);
                          }} placeholder="Bid amount" />
                          <input aria-label={`Bid ${index + 1} private key`} value={row.nonce} onChange={(event) => {
                            const next = revealRows.slice(); next[index] = { ...next[index], nonce: event.target.value }; setRevealRows(next);
                          }} placeholder="Private bid key" />
                        </div>
                      </details>
                    ))}
                  </div>
                  <div className="card-actions">
                    <button className="secondary-action" onClick={() => revealBids().catch((cause) => setError(cause instanceof Error ? cause.message : "Reveal failed."))} disabled={busy === "Reveal bids"}>
                      {busy === "Reveal bids" ? "Checking bids..." : "Check and reveal bids"}
                    </button>
                    <button className="primary-action" onClick={() => finalizeAuction().catch((cause) => setError(cause instanceof Error ? cause.message : "Finalization failed."))} disabled={busy === "Finalize auction"}>
                      {busy === "Finalize auction" ? "Choosing the winner..." : "Finish and record winner"}
                    </button>
                  </div>
                </Card>
              )}
            </section>
          )}

          {!compact && !contractAddress && walletInstalled !== false && (
            <div className="start-hint"><span>↑</span><div><strong>Start here</strong><p>Connect your wallet and set up the contract. Auction tools will then appear.</p></div></div>
          )}

          {!compact && contractAddress && (
            <details className="advanced-panel">
              <summary><span>Advanced tools</span><small>Edit or remove items, inspect the contract, and view activity.</small></summary>
              <div className="advanced-content">
                <Card title="Edit a bid" description="Change or remove a bid you already placed.">
                  <div className="field-grid">
                    <Field label="Bid number"><input value={bidId} onChange={(event) => setBidId(event.target.value)} /></Field>
                    <Field label="New amount"><input value={bidUpdateAmount} onChange={(event) => setBidUpdateAmount(event.target.value)} /></Field>
                    <Field label="New private key"><input value={bidUpdateNonce} onChange={(event) => setBidUpdateNonce(event.target.value)} /></Field>
                  </div>
                  <div className="card-actions">
                    <button className="secondary-action" onClick={() => updateBid().catch((cause) => setError(cause instanceof Error ? cause.message : "Bid update failed."))}>Update bid</button>
                    <button className="danger-action" onClick={() => deleteBid().catch((cause) => setError(cause instanceof Error ? cause.message : "Bid deletion failed."))}>Remove bid</button>
                  </div>
                </Card>
                <Card title="Edit an auction" description="Change the minimum price or closing time.">
                  <div className="field-grid">
                    <Field label="Auction number"><input value={auctionId} onChange={(event) => setAuctionId(event.target.value)} /></Field>
                    <Field label="New minimum price"><input value={manageReservePrice} onChange={(event) => setManageReservePrice(event.target.value)} /></Field>
                    <Field label="New closing time"><input type="datetime-local" value={manageEndAt} onChange={(event) => setManageEndAt(event.target.value)} /></Field>
                  </div>
                  <div className="card-actions">
                    <button className="secondary-action" onClick={() => updateAuction().catch((cause) => setError(cause instanceof Error ? cause.message : "Auction update failed."))}>Update auction</button>
                    <button className="danger-action" onClick={() => deleteAuction().catch((cause) => setError(cause instanceof Error ? cause.message : "Auction deletion failed."))}>Remove auction</button>
                  </div>
                </Card>
                <Card title="Contract details" description="Load technical information from Midnight.">
                  <Field label="Contract address"><input value={contractAddress} onChange={(event) => setContractAddress(event.target.value)} /></Field>
                  <div className="card-actions">
                    <button className="secondary-action" onClick={() => refreshSnapshot().catch((cause) => setError(cause instanceof Error ? cause.message : "Contract details could not be loaded."))}>Load details</button>
                    <button className="text-button" onClick={() => copyText(contractAddress).catch(() => undefined)}>Copy address</button>
                  </div>
                  {snapshot && <pre className="snapshot">{snapshot}</pre>}
                </Card>
                <Card title="Recent activity" description="Wallet-approved actions from this browser session.">
                  <div className="activity-list">
                    {activity.length === 0 && <p className="empty-state">No activity yet.</p>}
                    {activity.map((item) => (
                      <article key={item.id} className={`activity-item ${item.status}`}>
                        <div><strong>{item.title}</strong><p>{item.detail}</p></div>
                        {item.txId && <a href={`https://explorer.1am.xyz/tx/${item.txId}?network=preview`} target="_blank" rel="noreferrer">View</a>}
                      </article>
                    ))}
                  </div>
                </Card>
              </div>
            </details>
          )}
        </section>

        {error && (
          <div className="error-panel" role="alert">
            <div><strong>That did not work.</strong><span>{error}</span></div>
            <button onClick={() => setError("")}>Dismiss</button>
          </div>
        )}
        {explorerLink && !compact && (
          <div className="tx-strip"><span>Latest wallet action completed</span><a href={explorerLink} target="_blank" rel="noreferrer">View on 1AM Explorer</a></div>
        )}
      </main>
    );
  }

  return (
    <main className={compact ? "deploy-shell studio-shell studio-compact" : "studio-shell"}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <section className={compact ? "studio-hero studio-hero-compact" : "studio-hero"}>
        <div className="eyebrow">
          <span className="status-dot" />
          Midnight Preview
        </div>
        <h1>{compact ? "Deploy CipherBid" : "CipherBid control room"}</h1>
        <p className="lede">
          {compact
            ? "Deploy the sealed-bid auction contract from the browser. 1AM handles proving, balancing, and submission."
            : "Connect the 1AM wallet, deploy the contract, then manage auctions, bids, and finalization from the same browser session."}
        </p>
        <div className="hero-actions">
          {!session ? (
            <button className="primary-action" onClick={connect} disabled={busy === "Connecting wallet"}>
              {busy === "Connecting wallet" ? "Connecting to Preview..." : "Connect 1AM wallet"}
            </button>
          ) : !contractAddress ? (
            <button className="primary-action" onClick={() => deploy().catch((cause) => setError(cause instanceof Error ? cause.message : "Contract deployment failed."))} disabled={busy === "Deploying contract"}>
              {busy === "Deploying contract" ? "Proving and deploying..." : "Deploy CipherBid"}
            </button>
          ) : (
            <button className="primary-action" onClick={() => refreshSnapshot().catch((cause) => setError(cause instanceof Error ? cause.message : "Snapshot refresh failed."))}>
              Refresh chain snapshot
            </button>
          )}
          {!compact && (
            <button
              className="secondary-action"
              onClick={() => document.getElementById("deploy-panel")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              Jump to deploy
            </button>
          )}
        </div>
        <div className="hero-pills">
          <Pill>Network: preview</Pill>
          <Pill>{walletInstalled === false ? "1AM not installed" : walletInstalled === true ? "1AM detected" : "Detecting wallet"}</Pill>
          <Pill>{contractAddress ? `Contract ${truncate(contractAddress)}` : "No contract selected"}</Pill>
        </div>
      </section>

      {!compact && (
        <section className="status-grid">
          <article className="status-card">
            <span>Wallet</span>
            <strong>{session ? truncate(session.unshieldedAddress) : "Waiting to connect"}</strong>
          </article>
          <article className="status-card">
            <span>Network</span>
            <strong>{session?.config.networkId ?? "preview"}</strong>
          </article>
          <article className="status-card">
            <span>Contract</span>
            <strong>{contractAddress ? truncate(contractAddress) : "Not deployed yet"}</strong>
          </article>
          <article className="status-card">
            <span>Last tx</span>
            <strong>{currentTxId ? truncate(currentTxId) : "No transaction yet"}</strong>
          </article>
        </section>
      )}

      {walletInstalled === false && (
        <div className="notice">
          1AM was not detected. Install the browser extension from{" "}
          <a href="https://1am.xyz" target="_blank" rel="noreferrer">
            1am.xyz
          </a>
          , then refresh.
        </div>
      )}

      <section className="studio-grid">
        <Card
          eyebrow="Deploy"
          title="Browser deployment"
          description="Deploy through the wallet extension only. No server-side deployer key, no local proof server."
          className="deploy-card panel-feature"
        >
          <div className="flow">
            <div className={session ? "flow-step complete" : "flow-step active"}>
              <span>01</span>
              <div>
                <strong>Connect 1AM</strong>
                <small>Preview network only</small>
              </div>
            </div>
            <div className={contractAddress ? "flow-step complete" : session ? "flow-step active" : "flow-step"}>
              <span>02</span>
              <div>
                <strong>Approve deploy</strong>
                <small>Proved by your wallet</small>
              </div>
            </div>
            <div className={contractAddress ? "flow-step complete" : "flow-step"}>
              <span>03</span>
              <div>
                <strong>Contract ready</strong>
                <small>Address stays visible here</small>
              </div>
            </div>
          </div>

          {!session && walletInstalled !== false && (
            <button className="primary-action" onClick={connect} disabled={busy === "Connecting wallet"}>
              {busy === "Connecting wallet" ? "Connecting to Preview..." : "Connect 1AM wallet"}
            </button>
          )}

          {session && (
            <div className="wallet-summary">
              <div>
                <span>Wallet</span>
                <strong title={session.unshieldedAddress}>{truncate(session.unshieldedAddress, 12, 10)}</strong>
              </div>
              <div>
                <span>Network</span>
                <strong>{session.config.networkId}</strong>
              </div>
            </div>
          )}

          {session && !contractAddress && (
            <button className="primary-action" onClick={() => deploy().catch((cause) => setError(cause instanceof Error ? cause.message : "Contract deployment failed."))} disabled={busy === "Deploying contract"}>
              {busy === "Deploying contract" ? "Proving and deploying..." : "Deploy CipherBid"}
            </button>
          )}

          {contractAddress && (
            <div className="success-panel" aria-live="polite">
              <span>Deployment submitted</span>
              <h2>Contract address</h2>
              <code>{contractAddress}</code>
              <div className="success-actions">
                <button onClick={() => copyText(contractAddress).catch(() => undefined)}>Copy address</button>
                {contractTxId && (
                  <a href={`https://explorer.1am.xyz/tx/${contractTxId}?network=preview`} target="_blank" rel="noreferrer">
                    View transaction
                  </a>
                )}
              </div>
            </div>
          )}

          <p className="footnote">
            No deployer key is stored by this app. Deployment is authorized and proved inside the 1AM extension.
          </p>
        </Card>

        {!compact && (
          <Card
            eyebrow="Snapshot"
            title="On-chain contract view"
            description="Use the live provider to inspect the deployed contract state on Midnight Preview."
          >
            <div className="field-grid">
              <Field label="Contract address" hint="Paste the deployed address or use the one from the deploy panel.">
                <input
                  value={contractAddress}
                  onChange={(event) => setContractAddress(event.target.value)}
                  placeholder="e7452094f62cf0a7..."
                />
              </Field>
            </div>
            <div className="card-actions">
              <button className="secondary-action" onClick={() => refreshSnapshot().catch((cause) => setError(cause instanceof Error ? cause.message : "Snapshot refresh failed."))}>
                Load snapshot
              </button>
            </div>
            {snapshotOps.length > 0 && (
              <div className="chip-row">
                {snapshotOps.map((operation) => (
                  <Pill key={operation}>{operation}</Pill>
                ))}
              </div>
            )}
            <pre className="snapshot">{snapshot || "No snapshot loaded yet."}</pre>
          </Card>
        )}

        {!compact && (
          <Card
            eyebrow="Create"
            title="Open a sealed auction"
            description="Create the auction first, then keep the returned ID for bidding and reveal."
          >
            <div className="field-grid">
              <Field label="Reserve price">
                <input value={createReservePrice} onChange={(event) => setCreateReservePrice(event.target.value)} />
              </Field>
              <Field label="End time" hint="Unix timestamp in seconds.">
                <input value={createEndAt} onChange={(event) => setCreateEndAt(event.target.value)} />
              </Field>
            </div>
            <div className="card-actions">
              <button className="primary-action" onClick={() => createAuction().catch((cause) => setError(cause instanceof Error ? cause.message : "Auction creation failed."))} disabled={busy === "Create auction"}>
                {busy === "Create auction" ? "Creating auction..." : "Create auction"}
              </button>
            </div>
            {auctionId && (
              <div className="mini-result">
                <span>Auction ID</span>
                <strong>{auctionId}</strong>
              </div>
            )}
          </Card>
        )}

        {!compact && (
          <Card
            eyebrow="Bid"
            title="Commit a private bid"
            description="The wallet proves the commitment and keeps the bid hidden until reveal."
          >
            <div className="field-grid">
              <Field label="Auction ID">
                <input value={auctionId} onChange={(event) => setAuctionId(event.target.value)} />
              </Field>
              <Field label="Bid amount">
                <input value={bidAmount} onChange={(event) => setBidAmount(event.target.value)} />
              </Field>
              <Field label="Nonce" hint="Stored locally, then reused for reveal.">
                <input value={bidNonce} onChange={(event) => setBidNonce(event.target.value)} />
              </Field>
              <Field label="Bid ID" hint="Fills after a successful bid.">
                <input value={bidId} onChange={(event) => setBidId(event.target.value)} />
              </Field>
            </div>
            <div className="card-actions">
              <button className="primary-action" onClick={() => placeBid().catch((cause) => setError(cause instanceof Error ? cause.message : "Bid failed."))} disabled={busy === "Place bid"}>
                {busy === "Place bid" ? "Placing bid..." : "Place bid"}
              </button>
              <button className="secondary-action" onClick={() => setBidNonce(randomHex32())}>
                Randomize nonce
              </button>
            </div>
            {bidId && (
              <div className="mini-result">
                <span>Committed bid ID</span>
                <strong>{bidId}</strong>
              </div>
            )}
          </Card>
        )}

        {!compact && (
          <Card
            eyebrow="Manage"
            title="Update or delete a bid"
            description="Use the bid ID returned by the previous step."
          >
            <div className="field-grid">
              <Field label="Bid ID">
                <input value={bidId} onChange={(event) => setBidId(event.target.value)} />
              </Field>
              <Field label="Updated amount">
                <input value={bidUpdateAmount} onChange={(event) => setBidUpdateAmount(event.target.value)} />
              </Field>
              <Field label="Updated nonce">
                <input value={bidUpdateNonce} onChange={(event) => setBidUpdateNonce(event.target.value)} />
              </Field>
            </div>
            <div className="card-actions">
              <button className="primary-action" onClick={() => updateBid().catch((cause) => setError(cause instanceof Error ? cause.message : "Bid update failed."))} disabled={busy === "Update bid"}>
                {busy === "Update bid" ? "Updating bid..." : "Update bid"}
              </button>
              <button className="secondary-action" onClick={() => deleteBid().catch((cause) => setError(cause instanceof Error ? cause.message : "Bid deletion failed."))} disabled={busy === "Delete bid"}>
                {busy === "Delete bid" ? "Deleting bid..." : "Delete bid"}
              </button>
            </div>
          </Card>
        )}

        {!compact && (
          <Card
            eyebrow="Auction"
            title="Update or delete the auction"
            description="Keep the auction address in the snapshot panel, then adjust or remove it here."
          >
            <div className="field-grid">
              <Field label="Auction ID">
                <input value={auctionId} onChange={(event) => setAuctionId(event.target.value)} />
              </Field>
              <Field label="Reserve price">
                <input value={manageReservePrice} onChange={(event) => setManageReservePrice(event.target.value)} />
              </Field>
              <Field label="End time">
                <input value={manageEndAt} onChange={(event) => setManageEndAt(event.target.value)} />
              </Field>
            </div>
            <div className="card-actions">
              <button className="primary-action" onClick={() => updateAuction().catch((cause) => setError(cause instanceof Error ? cause.message : "Auction update failed."))} disabled={busy === "Update auction"}>
                {busy === "Update auction" ? "Updating auction..." : "Update auction"}
              </button>
              <button className="secondary-action" onClick={() => deleteAuction().catch((cause) => setError(cause instanceof Error ? cause.message : "Auction deletion failed."))} disabled={busy === "Delete auction"}>
                {busy === "Delete auction" ? "Deleting auction..." : "Delete auction"}
              </button>
            </div>
          </Card>
        )}

        {!compact && (
          <Card
            eyebrow="Reveal"
            title="Reveal and finalize"
            description="Fill all active bids, then run the organizer-only reveal or finalization flow."
          >
            <div className="field-grid reveal-grid">
              {revealRows.map((row, index) => (
                <div className="reveal-row" key={index}>
                  <span className="reveal-index">{String(index + 1).padStart(2, "0")}</span>
                  <input
                    value={row.bidId}
                    onChange={(event) => {
                      const next = revealRows.slice();
                      next[index] = { ...next[index], bidId: event.target.value };
                      setRevealRows(next);
                    }}
                    placeholder="Bid ID"
                  />
                  <input
                    value={row.auctionId}
                    onChange={(event) => {
                      const next = revealRows.slice();
                      next[index] = { ...next[index], auctionId: event.target.value };
                      setRevealRows(next);
                    }}
                    placeholder="Auction ID"
                  />
                  <input
                    value={row.amount}
                    onChange={(event) => {
                      const next = revealRows.slice();
                      next[index] = { ...next[index], amount: event.target.value };
                      setRevealRows(next);
                    }}
                    placeholder="Amount"
                  />
                  <input
                    value={row.nonce}
                    onChange={(event) => {
                      const next = revealRows.slice();
                      next[index] = { ...next[index], nonce: event.target.value };
                      setRevealRows(next);
                    }}
                    placeholder="Nonce"
                  />
                </div>
              ))}
            </div>
            <div className="card-actions">
              <button className="primary-action" onClick={() => revealBids().catch((cause) => setError(cause instanceof Error ? cause.message : "Reveal failed."))} disabled={busy === "Reveal bids"}>
                {busy === "Reveal bids" ? "Revealing..." : "Reveal bids"}
              </button>
              <button className="secondary-action" onClick={() => finalizeAuction().catch((cause) => setError(cause instanceof Error ? cause.message : "Finalization failed."))} disabled={busy === "Finalize auction"}>
                {busy === "Finalize auction" ? "Finalizing..." : "Finalize auction"}
              </button>
            </div>
          </Card>
        )}

        {!compact && (
          <Card eyebrow="History" title="Recent actions" description="Each wallet-backed action appears here with its transaction ID.">
            <div className="activity-list">
              {activity.length === 0 && <p className="empty-state">No activity yet.</p>}
              {activity.map((item) => (
                <article key={item.id} className={`activity-item ${item.status}`}>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                  {item.txId && (
                    <a href={`https://explorer.1am.xyz/tx/${item.txId}?network=preview`} target="_blank" rel="noreferrer">
                      {truncate(item.txId, 10, 10)}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </Card>
        )}
      </section>

      {error && <div className="error-panel">{error}</div>}

      {explorerLink && (
        <div className="tx-strip">
          <span>Latest tx</span>
          <a href={explorerLink} target="_blank" rel="noreferrer">
            {truncate(currentTxId, 12, 12)}
          </a>
        </div>
      )}
    </main>
  );
}
