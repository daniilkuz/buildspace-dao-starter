import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDropAddress = readFileSync("./editionDropAddress.txt", "utf8");
const tokenAddress = readFileSync("./tokenAddress.txt", "utf8");

const editionDrop = sdk.getEditionDrop(editionDropAddress);
const token = sdk.getToken(tokenAddress);

(async () => {
  try {
    const walletAddress = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddress.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!"
      );
      process.exit(0);
    }

    const airdropTargets = walletAddress.map((address) => {
      const randomAmount = Math.floor(
        Math.random() * (10000 - 1000 + 1) + 1000
      );
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log(
      "✅ Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (error) {
    console.error("Failed to airdrop tokens", error);
  }
})();
