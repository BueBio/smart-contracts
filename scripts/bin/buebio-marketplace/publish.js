'use strict';
require('dotenv').config();
const {BigNumber} = require('ethers');
const {ethersInstance, loadContract, walletOfProvider} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOMARKETPLACE_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-marketplace.sol/BuebioMarketplace.json');

async function run(privateKey, tokenAddress, tokenId, payToken, payAmount) {
    const provider = ethersInstance();
    const wallet = walletOfProvider(privateKey, provider);
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const payAmountHex = BigNumber.from(payAmount).toHexString();

    const estimateGas = await contract.estimateGas.publish(
        tokenAddress,
        tokenId,
        payToken,
        payAmountHex
    );
    console.log(`Estimate gas -> ${estimateGas.toString()}`);
    const gasPrice = await provider.getGasPrice();
    console.log(`Gas price -> ${gasPrice.toString()}`);
    const response = await contract.publish(
        tokenAddress,
        tokenId,
        payToken,
        payAmountHex,
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
    'a6a6c8730f880d1448af6f40e77235d1629c62271de240aa04fc5bfffe2e298d', // privateKey
    '0x78A2e6494283E8110Aec712Cd3F400Cc1058F541', // address tokenAddress
    1, // uint256 tokenId
    '0x2AE1C84F7Bc56323EA6bc588E828DAc9E1C91BcD', // address payToken
    "1500000000000000000" // uint256 payAmount
);
