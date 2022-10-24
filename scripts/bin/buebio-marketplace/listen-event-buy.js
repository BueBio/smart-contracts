'use strict';
require('dotenv').config();
const {ethersInstance, loadContract} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOMARKETPLACE_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-marketplace.sol/BuebioMarketplace.json');

async function run() {
    const provider = ethersInstance();
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    contract.on('Buy', (id, sender, toWallet) => {
        console.log('----------- New event: "Buy"');
        console.log(`- id: ${id}`);
        console.log(`- sender: ${sender}`);
        console.log(`- toWallet: ${toWallet}`);
    });
}

console.log('---- BuebioMarketplace - listen-event-buy');
run();
