'use strict';
require('dotenv').config();
const {ethersInstance, loadContract} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOMARKETPLACE_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-marketplace.sol/BuebioMarketplace.json');

async function run(walletAddress) {
    const provider = ethersInstance();
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const response = await contract.publicationsQuantityByWallet(walletAddress);
    console.log(response.toNumber());
}

console.log('---- BuebioMarketplace - publicationsQuantityByWallet');
run(
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8' // walletAddress
);
