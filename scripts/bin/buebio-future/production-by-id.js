'use strict';
require('dotenv').config();
const {ethersInstance, loadContract} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOFUTURE_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-future.sol/BuebioFuture.json');

async function run(id, address) {
    const provider = ethersInstance();
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const response = await contract.productionById(
        id
    );
    console.log('------');
    console.log(`- availableUntil: ${response.availableUntil}`);
    console.log(`- payToken:       ${response.payToken}`);
    console.log(`- payAmount:      ${response.payAmount.toString()}`);
    console.log(`- recipient:      ${response.recipient}`);
}

console.log('---- BuebioFuture - balanceOf');
run(
    1 // token ID
);
