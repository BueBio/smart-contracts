'use strict';
require('dotenv').config();
const {ethersInstance, loadContract, walletOfProvider} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOIMPACT_ADDRESS;
const ACCOUNT_PRIVATEKEY = process.env.ACCOUNT_PRIVATEKEY;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-impact.sol/BuebioImpact.json');

async function run(id, amount) {
    const provider = ethersInstance();
    const wallet = walletOfProvider(ACCOUNT_PRIVATEKEY, provider);
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const estimateGas = await contract.estimateGas.mint(ACCOUNT_ADDRESS, id, amount, "0x");
    console.log(`Estimate gas -> ${estimateGas.toString()}`);
    const gasPrice = await provider.getGasPrice();
    console.log(`Gas price -> ${gasPrice.toString()}`);
    const response = await contract.mint(
        ACCOUNT_ADDRESS,
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
    2, // id: token ID
    30, // amount: quantity of tokens
);
