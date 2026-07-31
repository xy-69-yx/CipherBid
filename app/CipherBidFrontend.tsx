"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { submitCallTxAsync } from "@midnight-ntwrk/midnight-js-contracts";
import { SucceedEntirely } from "@midnight-ntwrk/midnight-js-types";
import {
  CIPHERBID_CONTRACT_ADDRESS,
  CIPHERBID_ZK_ASSET_PATH,
  makeCompiledContract,
  prepareCipherBidSession,
  PRIVATE_STATE_ID,
  waitForTxFinality,
} from "@/lib/cipherbid";
import {
  connectPreviewWallet,
  detectOneAmWallet,
  selectPreviewNetwork,
  type ConnectedSession,
} from "@/lib/midnight";

type Activity = {
  id: number;
  title: string;
  detail: string;
  txId?: string;
  status: "done" | "error";
};

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

function hexToBytes(value: string) {
  const normalized = value.trim().replace(/^0x/, "");
  if (!/^[0-9a-fA-F]{64}$/.test(normalized)) {
    throw new Error("The private bid key must be exactly 32 bytes of hex.");
  }
  const bytes = new Uint8Array(32);
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

export default function CipherBidFrontend() {
  const [session, setSession] = useState<ConnectedSession | null>(null);
  const [walletInstalled, setWalletInstalled] = useState<boolean | null>(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [currentTxId, setCurrentTxId] = useState("");
  const [activity, setActivity] = useState<Activity[]>([]);
  const [activeTask, setActiveTask] = useState<"create" | "bid">("create");
  const [createReservePrice, setCreateReservePrice] = useState("100");
  const [createEndAt, setCreateEndAt] = useState(makeDefaultEndAt);
  const [auctionId, setAuctionId] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [bidNonce, setBidNonce] = useState(randomHex32);
  const [bidId, setBidId] = useState("");

  useEffect(() => {
    selectPreviewNetwork();
    detectOneAmWallet().then((wallet) => setWalletInstalled(wallet !== null));
  }, []);

  async function connect() {
    setBusy("Connecting wallet");
    setError("");
    try {
      const connected = await connectPreviewWallet(CIPHERBID_ZK_ASSET_PATH);
      await prepareCipherBidSession(connected);
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

  async function submitCallTx(
    circuitId: "createAuction" | "bid",
    args: readonly unknown[],
    activityTitle: string,
    successDetail: string,
  ) {
    if (!session) {
      throw new Error("Connect your 1AM wallet first.");
    }

    setBusy(activityTitle);
    setError("");
    try {
      const submitted = await submitCallTxAsync(session.providers as never, {
        compiledContract: compiledContract as never,
        circuitId: circuitId as never,
        contractAddress: CIPHERBID_CONTRACT_ADDRESS,
        privateStateId: PRIVATE_STATE_ID,
        args,
      } as never);

      setCurrentTxId(submitted.txId);
      const finalized = await waitForTxFinality(session, submitted.txId);
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
      [
        parseBigIntInput(createReservePrice, "Minimum price"),
        dateToUnix(createEndAt, "Closing time"),
      ] as const,
      "Create auction",
      "Auction opened on CipherBid.",
    );
    setAuctionId(String(submitted.callTxData.private.result));
  }

  async function placeBid() {
    const submitted = await submitCallTx(
      "bid",
      [
        parseBigIntInput(auctionId, "Auction number"),
        parseBigIntInput(bidAmount, "Bid amount"),
        hexToBytes(bidNonce),
      ] as const,
      "Place bid",
      `Private bid submitted to auction #${auctionId}.`,
    );
    setBidId(String(submitted.callTxData.private.result));
  }

  async function copyText(value: string) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
    }
  }

  const explorerLink = currentTxId
    ? `https://explorer.1am.xyz/tx/${currentTxId}?network=preview`
    : "";

  return (
    <main className="studio-shell simple-app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="simple-nav">
        <Link href="/" className="wordmark">CipherBid</Link>
        <Pill><span className="status-dot" /> Midnight Preview</Pill>
      </header>

      <section className="studio-hero simple-hero">
        <span className="plain-eyebrow">Private auctions made simple</span>
        <h1>Bid privately. Prove the winner.</h1>
        <p className="lede">
          Create an auction or place a sealed bid on the shared CipherBid contract.
          Bid amounts stay hidden until the auction ends.
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
          eyebrow="Shared contract"
          title={session ? "Ready to create or bid" : "Connect your wallet"}
          description={
            session
              ? "CipherBid is already deployed. Choose what you want to do below."
              : "Connect 1AM once. There is no contract deployment step."
          }
          className="setup-card panel-feature"
        >
          <div className="simple-steps" aria-label="Connection status">
            <div className="simple-step complete">
              <span>✓</span><strong>Contract online</strong>
            </div>
            <div className={session ? "simple-step complete" : "simple-step current"}>
              <span>{session ? "✓" : "2"}</span><strong>Connect wallet</strong>
            </div>
            <div className={session ? "simple-step complete" : "simple-step"}>
              <span>{session ? "✓" : "3"}</span><strong>Create or bid</strong>
            </div>
          </div>

          {!session && walletInstalled !== false && (
            <button className="primary-action" onClick={connect} disabled={busy === "Connecting wallet"}>
              {busy === "Connecting wallet" ? "Waiting for 1AM..." : "Connect 1AM wallet"}
            </button>
          )}

          {session && (
            <p className="connected-note">
              <span className="connected-dot" /> Connected to 1AM on Preview
              <span title={session.unshieldedAddress}>{truncate(session.unshieldedAddress, 6, 6)}</span>
            </p>
          )}

          <details className="address-details">
            <summary>Shared contract address</summary>
            <code>{CIPHERBID_CONTRACT_ADDRESS}</code>
            <div className="success-actions">
              <button onClick={() => copyText(CIPHERBID_CONTRACT_ADDRESS).catch(() => undefined)}>
                Copy address
              </button>
            </div>
          </details>
        </Card>

        {session ? (
          <section className="task-area">
            <div className="task-heading">
              <div>
                <span className="plain-eyebrow">Choose a task</span>
                <h2>What would you like to do?</h2>
              </div>
              <div className="task-tabs" role="tablist" aria-label="Auction tasks">
                <button
                  className={activeTask === "create" ? "active" : ""}
                  onClick={() => setActiveTask("create")}
                >
                  Create auction
                </button>
                <button
                  className={activeTask === "bid" ? "active" : ""}
                  onClick={() => setActiveTask("bid")}
                >
                  Place a bid
                </button>
              </div>
            </div>

            {activeTask === "create" && (
              <Card
                eyebrow="For auction owners"
                title="Create a new auction"
                description="Choose the lowest price you will accept and when bidding should close."
                className="task-card"
              >
                <div className="field-grid">
                  <Field label="Minimum price" hint="Use a whole number, for example 100.">
                    <input
                      inputMode="numeric"
                      value={createReservePrice}
                      onChange={(event) => setCreateReservePrice(event.target.value)}
                    />
                  </Field>
                  <Field label="Bidding closes">
                    <input
                      type="datetime-local"
                      value={createEndAt}
                      onChange={(event) => setCreateEndAt(event.target.value)}
                    />
                  </Field>
                </div>
                <div className="card-actions">
                  <button
                    className="primary-action"
                    onClick={() => createAuction().catch((cause) =>
                      setError(cause instanceof Error ? cause.message : "Auction creation failed.")
                    )}
                    disabled={busy === "Create auction"}
                  >
                    {busy === "Create auction" ? "Creating your auction..." : "Create auction"}
                  </button>
                </div>
                {auctionId && (
                  <div className="important-result">
                    <span>Auction created</span>
                    <p>Share this auction number with bidders.</p>
                    <strong>#{auctionId}</strong>
                    <button onClick={() => copyText(auctionId).catch(() => undefined)}>
                      Copy auction number
                    </button>
                  </div>
                )}
              </Card>
            )}

            {activeTask === "bid" && (
              <Card
                eyebrow="For bidders"
                title="Place a private bid"
                description="Your amount is committed privately to the shared auction contract."
                className="task-card"
              >
                <div className="field-grid">
                  <Field label="Auction number" hint="Get this from the auction owner.">
                    <input
                      inputMode="numeric"
                      value={auctionId}
                      onChange={(event) => setAuctionId(event.target.value)}
                      placeholder="For example, 1"
                    />
                  </Field>
                  <Field label="Your bid">
                    <input
                      inputMode="numeric"
                      value={bidAmount}
                      onChange={(event) => setBidAmount(event.target.value)}
                      placeholder="Enter a whole number"
                    />
                  </Field>
                </div>
                <details className="advanced-inline">
                  <summary>Private bid key</summary>
                  <Field label="Private bid key" hint="Keep this key. It is needed when the auction is revealed.">
                    <input value={bidNonce} onChange={(event) => setBidNonce(event.target.value)} />
                  </Field>
                  <button className="text-button" onClick={() => setBidNonce(randomHex32())}>
                    Create a new key
                  </button>
                </details>
                <div className="card-actions">
                  <button
                    className="primary-action"
                    onClick={() => placeBid().catch((cause) =>
                      setError(cause instanceof Error ? cause.message : "Bid failed.")
                    )}
                    disabled={busy === "Place bid"}
                  >
                    {busy === "Place bid" ? "Sealing your bid..." : "Place private bid"}
                  </button>
                </div>
                {bidId && (
                  <div className="important-result">
                    <span>Bid placed</span>
                    <p>Keep both the bid number and private key for the reveal.</p>
                    <strong>Bid #{bidId}</strong>
                    <button onClick={() => copyText(`${bidId}:${bidNonce}`).catch(() => undefined)}>
                      Copy bid details
                    </button>
                  </div>
                )}
              </Card>
            )}
          </section>
        ) : (
          walletInstalled !== false && (
            <div className="start-hint">
              <span>↑</span>
              <div>
                <strong>Start here</strong>
                <p>Connect your wallet, then create an auction or place a private bid.</p>
              </div>
            </div>
          )
        )}

        {session && activity.length > 0 && (
          <Card title="Recent activity" description="Wallet-approved actions from this browser session.">
            <div className="activity-list">
              {activity.map((item) => (
                <article key={item.id} className={`activity-item ${item.status}`}>
                  <div><strong>{item.title}</strong><p>{item.detail}</p></div>
                  {item.txId && (
                    <a
                      href={`https://explorer.1am.xyz/tx/${item.txId}?network=preview`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  )}
                </article>
              ))}
            </div>
          </Card>
        )}
      </section>

      {error && (
        <div className="error-panel" role="alert">
          <div><strong>That did not work.</strong><span>{error}</span></div>
          <button onClick={() => setError("")}>Dismiss</button>
        </div>
      )}

      {explorerLink && (
        <div className="tx-strip">
          <span>Latest wallet transaction</span>
          <a href={explorerLink} target="_blank" rel="noreferrer">View on 1AM Explorer</a>
        </div>
      )}
    </main>
  );
}
