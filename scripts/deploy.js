const { ethers, network } = require("hardhat");
const { verifyUpload } = require("../utils/verify-upload");
const {run_update_frontend} = require('./update_frontend')


async function main() {
  const chainId = network.config.chainId;
  console.log("chainId is ", chainId);
  const args = [];
  // get contract
  const Upload = await ethers.deployContract("Upload", args, {});
  await Upload.waitForDeployment();

  console.log("Library deployed to:", Upload.target);

  console.log("Waiting for block conformations...");
    chainId == 31337
      ? await Upload.deploymentTransaction().wait(1)
    : await Upload.deploymentTransaction().wait(6);
  await run_update_frontend()
  console.log("Confirmed!");

  // * only verify on testnets or mainnets.
  if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    await verifyUpload(Upload.target, args);
    console.log("contract verified on etherscan");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
