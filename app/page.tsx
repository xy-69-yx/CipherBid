import CipherBidFrontend from "./CipherBidFrontend";

export const metadata = {
  title: "CipherBid | Midnight Preview",
  description: "Sealed-bid auctions on Midnight Preview with a 1AM wallet flow.",
};

export default function Home() {
  return <CipherBidFrontend />;
}
