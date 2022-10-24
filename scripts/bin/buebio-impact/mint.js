'use strict';
require('dotenv').config();
const {ethersInstance, loadContract, walletOfProvider} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOIMPACT_ADDRESS;
const ACCOUNT_PRIVATEKEY = process.env.ACCOUNT_PRIVATEKEY;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-impact.sol/BuebioImpact.json');

async function run(accountAddress, id, amount) {
    const provider = ethersInstance();
    const wallet = walletOfProvider(ACCOUNT_PRIVATEKEY, provider);
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const estimateGas = await contract.estimateGas.mint(accountAddress, id, amount, "0x");
    console.log(`Estimate gas -> ${estimateGas.toString()}`);
    const gasPrice = await provider.getGasPrice();
    console.log(`Gas price -> ${gasPrice.toString()}`);
    const response = await contract.mint(
        accountAddress,
        id,
        amount,
        "0x",
        {
            gasLimit: estimateGas,
            gasPrice,
        }
    );
    console.log('response', response);
    await response.wait()
    console.log(response);
}

console.log('---- BuebioImpact - mint');
run(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // accountAddress: address of recipient
    3, // id: token ID
    100, // amount: quantity of tokens
);
