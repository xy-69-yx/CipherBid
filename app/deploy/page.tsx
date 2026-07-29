import CipherBidFrontend from "../CipherBidFrontend";

export const metadata = {
  title: "Deploy CipherBid | Midnight Preview",
  description: "Deploy CipherBid through the 1AM wallet on Midnight Preview.",
};

export default function DeployPage() {
  return <CipherBidFrontend mode="deploy" />;
}
