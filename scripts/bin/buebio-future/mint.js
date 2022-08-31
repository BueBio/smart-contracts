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

run(
    1,
    400,
    new Date('2022-09-01T03:00:00.000Z'),
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    3,
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'
);
