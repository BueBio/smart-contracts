'use strict';
require('dotenv').config();
const {ethersInstance, loadContract, walletOfProvider} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOMARKETPLACE_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-marketplace.sol/BuebioMarketplace.json');

async function run(privateKey, tokenAddress, tokenId, payToken, payAmount) {
    const provider = ethersInstance();
    const wallet = walletOfProvider(privateKey, provider);
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const estimateGas = await contract.estimateGas.publish(
        tokenAddress,
        tokenId,
        payToken,
        payAmount
    );
    console.log(`Estimate gas -> ${estimateGas.toString()}`);
    const gasPrice = await provider.getGasPrice();
    console.log(`Gas price -> ${gasPrice.toString()}`);
    const response = await contract.publish(
        tokenAddress,
        tokenId,
        payToken,
        payAmount,
        {
            gasLimit: estimateGas,
            gasPrice,
        }
    );
    console.log('response', response);
    await response.wait()
    console.log(response);
}

console.log('---- BuebioMarketplace - publish');
run(
    '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', // privateKey
    '0x5FbDB2315678afecb367f032d93F642f64180aa3', // address tokenAddress
    1, // uint256 tokenId
    '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853', // address payToken
    20 // uint256 payAmount
);
