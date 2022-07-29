import sdk from "./1-initialize-sdk.js";
import { readFileSync, writeFileSync } from "fs";

const tokenAddress = readFileSync("./tokenAddress.txt", "utf8");

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      name: "Governance MuseumDAO",
      voting_token_address: tokenAddress,
      voting_delay_in_blocks: 0,
      voting_period_in_blocks: 6570,
      voting_quorum_fraction: 0,
      proposal_token_threshold: 0,
    });
    writeFileSync("./voteContractAddress.txt", voteContractAddress);
    console.log(
      "✅ Successfully deployed vote contract, address: ",
      voteContractAddress
    );
  } catch (error) {
    console.error("Failed to deploy vote contract", error);
  }
})();
