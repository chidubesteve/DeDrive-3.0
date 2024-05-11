const { ethers, network } = require("hardhat");
const fs = require("fs");

const FRONT_END_ADDRESS_FILE = "./client/src/constants/contractAddresses.json";
const FRONT_END_ABI_FILE = "./client/src/constants/abi.json";

const run_update_frontend = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log("updating front end....");
    await updateContractAddress();
    await updateContractAbi();
  }
};
async function updateContractAddress() {
  const upload = await ethers.deployContract("Upload");
  await upload.waitForDeployment();
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESS_FILE, "utf-8")
  );
    if (chainId in currentAddresses) {
        if (!currentAddresses[chainId].includes(upload.target)) {
          currentAddresses[chainId].push(upload.target)
      }
  } else
  {
    currentAddresses[chainId] = [upload.target];
    }
    fs.writeFileSync(FRONT_END_ADDRESS_FILE, JSON.stringify(currentAddresses))
}
async function updateContractAbi() {
  const upload = await ethers.deployContract("Upload");
  await upload.waitForDeployment();
  fs.writeFileSync(FRONT_END_ABI_FILE, upload.interface.formatJson());
}
exports.run_update_frontend = run_update_frontend;