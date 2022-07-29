import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const tokenAddress = readFileSync("./tokenAddress.txt", "utf8");
const voteContractAddress = readFileSync("./voteContractAddress.txt", "utf8");

const token = sdk.getToken(tokenAddress);
const vote = sdk.getVote(voteContractAddress);

(async () => {
  try {
    await token.roles.grant("minter", vote.getAddress());
    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = (Number(ownedAmount) / 100) * 90;
    await token.transfer(vote.getAddress(), percent90);
    console.log(
      "✅ Successfully transferred " + percent90 + " tokens to vote contract"
    );
  } catch (error) {
    console.error("failed to transfer tokens to vote contract", error);
  }
})();
