'use strict';
require('dotenv').config();
const {ethersInstance, loadContract} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOMARKETPLACE_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-marketplace.sol/BuebioMarketplace.json');

async function run(index) {
    const provider = ethersInstance();
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const response = await contract.publications(index);
    console.log(response);
}

console.log('---- BuebioMarketplace - publications');
run(
    4, // index
);
