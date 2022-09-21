'use strict';
require('dotenv').config();
const {ethersInstance, loadContract} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOFUTURE_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-future.sol/BuebioFuture.json');

async function run(id, address) {
    const provider = ethersInstance();
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const response = await contract.balanceOf(
        address,
        id
    );
    console.log(response.toNumber());
}

console.log('---- BuebioFuture - balanceOf');
run(
    1, // token ID
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', // wallet address
);
