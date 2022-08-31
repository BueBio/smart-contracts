'use strict';
require('dotenv').config();
const {ethersInstance, loadContract} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOIMPACT_ADDRESS;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;
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

// Check balance owner
run(3, ACCOUNT_ADDRESS);

// Check balance secondary account
//run(1, "");
