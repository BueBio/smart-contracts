'use strict';
require('dotenv').config();
const {ethersInstance, loadContract, walletOfProvider} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOMARKETPLACE_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-marketplace.sol/BuebioMarketplace.json');

async function run(privateKey, publicationId, toWallet) {
    const provider = ethersInstance();
    const wallet = walletOfProvider(privateKey, provider);
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const estimateGas = await contract.estimateGas.buy(
        publicationId,
        toWallet
    );
    console.log(`Estimate gas -> ${estimateGas.toString()}`);
    const gasPrice = await provider.getGasPrice();
    console.log(`Gas price -> ${gasPrice.toString()}`);
    const response = await contract.buy(
        publicationId,
        toWallet,
        {
            gasLimit: estimateGas,
            gasPrice,
        }
    );
    console.log('response', response);
    await response.wait()
    console.log(response);
}

console.log('---- BuebioMarketplace - buy');
run(
    '7a6913cc79fa70497afbffc1fd58b9af0b97196c4ee23f19eb31a085d0613993', // privateKey
    2, // publicationId
    '0x796867C8024Ec53dc06e801919944CB934Afbbe9' // address toWallet
);
