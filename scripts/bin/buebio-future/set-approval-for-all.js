'use strict';
require('dotenv').config();
const {ethersInstance, loadContract, walletOfProvider} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOFUTURE_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-future.sol/BuebioFuture.json');

async function run(privateKey, toWallet, approved) {
    const provider = ethersInstance();
    const wallet = walletOfProvider(privateKey, provider);
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const estimateGas = await contract.estimateGas.setApprovalForAll(
        toWallet,
        approved
    );
    console.log(`Estimate gas -> ${estimateGas.toString()}`);
    const gasPrice = await provider.getGasPrice();
    console.log(`Gas price -> ${gasPrice.toString()}`);
    const response = await contract.setApprovalForAll(
        toWallet,
        approved,
        {
            gasLimit: estimateGas,
            gasPrice,
        }
    );
    console.log('response', response);
    await response.wait()
    console.log(response);
}

console.log('---- BuebioFuture - setApprovalForAll');
run(
    '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a', // privateKey
    '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE', // toWallet: wallet to receive permissions
    true, // approved: if true it will grant permissions, if false it will revoke permissions
);
