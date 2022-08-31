'use strict';
require('dotenv').config();
const {ethersInstance, loadContract} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOIMPACT_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-impact.sol/BuebioImpact.json');

async function run(id, address) {
    const provider = ethersInstance();
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const response = await contract.queryFilter('Mint');
    response.forEach((elem) => {
        console.log('--------------------');
        console.log(`transactionHash: ${elem.transactionHash}`);
        console.log(`id:              ${elem.args.id.toNumber()}`);
        console.log(`account:         ${elem.args.account}`);
        console.log(`amount:          ${elem.args.amount.toNumber()}`);
        console.log('--------------------');
    });
}

run();
