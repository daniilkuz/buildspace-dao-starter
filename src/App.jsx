import { useMetamask, useAddress, useEditionDrop } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
// import { readFileSync } from "fs";

const App = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log(`👋 Address: ${address}`);

  // const editionDropAddress = readFileSync("./editionDropAddress.txt", "utf8");
  // const editionDrop = useEditionDrop(editionDropAddress);
  const editionDrop = useEditionDrop(
    "0x4966923aE0e5C063533c31D606F5714de78E6C6f"
  );
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance!", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNFT = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
      );
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to MuseumDAO!</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <dev className="member-page">
        <h1>🍪DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </dev>
    );
  }

  return (
    <div className="mint-nft">
      <h1>Mint your free 🍪DAO Membership NFT</h1>
      <button desabled={isClaiming} onClick={mintNFT}>
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
};

export default App;
