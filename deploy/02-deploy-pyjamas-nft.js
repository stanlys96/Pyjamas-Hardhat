const { ethers, network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
require("dotenv").config();

const KEPT_BALANCE = ethers.utils.parseEther("100");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  const waitConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  const pyjamasNFT = await deploy("PyjamasNFT", {
    from: deployer,
    log: true,
    args: [
      "Pyjamas",
      "PJM",
      "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/",
    ],
    waitConfirmations: waitConfirmations,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(
      pyjamasNFT.address,
      [
        "Pyjamas",
        "PJM",
        "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/",
      ],
      "contracts/PyjamasNFT.sol:PyjamasNFT"
    );
  }
};

module.exports.tags = ["all", "token-farm"];
