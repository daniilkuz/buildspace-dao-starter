import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { writeFileSync } from "fs";

(async () => {
  try {
    const tokenAddress = await sdk.deployer.deployToken({
      name: "MuseumDAO Governance Token",
      symbol: "MUSDAO",
      primary_sale_recipient: AddressZero,
    });

    writeFileSync("./tokenAddress.txt", tokenAddress);

    console.log(
      "✅ Successfully deployed token module, address:",
      tokenAddress
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();
