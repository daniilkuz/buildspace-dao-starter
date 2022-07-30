import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const tokenAddress = readFileSync("./tokenAddress.txt", "utf8");
const token = sdk.getToken(tokenAddress);

(async () => {
  try {
    const allRoles = await token.roles.getAll();
    console.log("👀 Roles that exist right now:", allRoles);
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      "🎉 Roles after revoking ourselves",
      await token.roles.getAll()
    );
    console.log(
      "✅ Successfully revoked our superpowers from the ERC-20 contract"
    );
  } catch (error) {
    console.log("Failed to revoke ourselves from the DAO treasury", error);
  }
})();
