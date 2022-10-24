'use strict';
require('dotenv').config();
const {ethersInstance, loadContract} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOIMPACT_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-impact.sol/BuebioImpact.json');

async function run(id, address) {
    const provider = ethersInstance();
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const response = await contract.balanceOf(
        address,
        id
    );
    console.log(response.toNumber());
}

console.log('---- BuebioImpact - balanceOf');
run(
    1, // id: token ID
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // address: wallet address
);
