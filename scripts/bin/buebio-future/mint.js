'use strict';
require('dotenv').config();
const {ethersInstance, loadContract, walletOfProvider} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOFUTURE_ADDRESS;
const ACCOUNT_PRIVATEKEY = process.env.ACCOUNT_PRIVATEKEY;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-future.sol/BuebioFuture.json');

async function run(id, amount, availableUntil, payToken, payAmount, recipient) {
    const provider = ethersInstance();
    const wallet = walletOfProvider(ACCOUNT_PRIVATEKEY, provider);
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const formattedAvailableUntil = availableUntil.getTime();
    const estimateGas = await contract.estimateGas.mint(
        id,
        amount,
        "0x",
        formattedAvailableUntil,
        payToken,
        payAmount,
        recipient
    );
    console.log(`Estimate gas -> ${estimateGas.toString()}`);
    const gasPrice = await provider.getGasPrice();
    console.log(`Gas price -> ${gasPrice.toString()}`);
    const response = await contract.mint(
        id,
        amount,
        "0x",
        formattedAvailableUntil,
        payToken,
        payAmount,
        recipient,
        {
            gasLimit: estimateGas,
            gasPrice,
        }
    );
    console.log('response', response);
    await response.wait()
    console.log(response);
}

console.log('---- BuebioFuture - mint');
run(
    1, // id: token ID
    200, // amount: quantity of tokens
    new Date('2022-10-08T00:00:00Z'), // availableUntil: available until (date)
    '0x2AE1C84F7Bc56323EA6bc588E828DAc9E1C91BcD', // payToken: payment token address
    7, // payAmount: price - amount of payTokens of each token
    '0x59d4f88934AB4406fBBbcCBC600b4fDf35B2bF15' // recipient: wallet owner of this tokens
);
