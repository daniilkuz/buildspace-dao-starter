import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";
import { readFileSync } from "fs";

const editionDropAddress = readFileSync("./editionDropAddress.txt", "utf8");
const editionDrop = sdk.getEditionDrop(editionDropAddress);

(async () => {
  try {
    const claimConditions = [
      {
        startTime: new Date(),
        maxQuantity: 50_000,
        price: 0,
        quantityLimitPerTransaction: 1,
        waitInSeconds: MaxUint256,
      },
    ];

    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("✅ Successfully set claim condition!");
  } catch (error) {
    console.error("failed to set claim condition", error);
  }
})();
