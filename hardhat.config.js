/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // defaultNetwork: "sepolia",
  networks: {
    localhost: {
      chainId: 31337,
    },
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      saveDeployments: true,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [],
  },
  paths: {
    artifacts: "./artifacts",
  },
};
