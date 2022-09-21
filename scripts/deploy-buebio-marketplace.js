const { ethers } = require('hardhat');

async function main() {
  const Sc = await ethers.getContractFactory('BuebioMarketplace');
  const scDeployed = await Sc.deploy();

  await scDeployed.deployed();

  const txHash = scDeployed.deployTransaction.hash;
  console.log(`Tx hash: ${txHash}\nWaiting for transaction to be mined...`);
  const txReceipt = await ethers.provider.waitForTransaction(txHash);

  console.log(`Smart-contract deployed to: ${txReceipt.contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
