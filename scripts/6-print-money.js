import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const tokenAddress = readFileSync("./tokenAddress.txt", "utf8");
const token = sdk.getToken(tokenAddress);

(async () => {
  try {
    const amount = 1_000_000;
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();
    console.log(
      "✅ There now is",
      totalSupply.displayValue,
      "$MUSDAO in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
