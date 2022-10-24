'use strict';
require('dotenv').config();
const {ethersInstance, loadContract} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOMARKETPLACE_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-marketplace.sol/BuebioMarketplace.json');

async function run() {
    const provider = ethersInstance();
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    contract.on('Publish', (id, owner, publication) => {
        console.log('----------- New event: "Publish"');
        console.log(`- id: ${id}`);
        console.log(`- owner: ${owner}`);
        console.log(`- publication.owner: ${publication.owner}`);
        console.log(`- publication.tokenAddress: ${publication.tokenAddress}`);
        console.log(`- publication.tokenId: ${publication.tokenId}`);
        console.log(`- publication.payToken: ${publication.payToken}`);
        console.log(`- publication.payAmount: ${publication.payAmount}`);
    });
}

console.log('---- BuebioMarketplace - listen-event-publish');
run();
