const hre = require("hardhat");

 async function main() {
    // get contract
    const Upload = await hre.ethers.deployContract ("Upload", [], {})
     await Upload.waitForDeployment();

     console.log("Library deployed to:", Upload.target)
 }

 main().catch((error) => {
     console.error(error);
     process.exitCode = 1;
 })