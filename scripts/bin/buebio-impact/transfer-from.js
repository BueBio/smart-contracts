'use strict';
require('dotenv').config();
const {ethersInstance, loadContract, walletOfProvider} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOIMPACT_ADDRESS;
const ACCOUNT_PRIVATEKEY = process.env.ACCOUNT_PRIVATEKEY;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;
const ACCOUNT_ADDRESS_SECONDARY = process.env.ACCOUNT_ADDRESS_SECONDARY;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-impact.sol/BuebioImpact.json');

async function run(id, amount) {
    const provider = ethersInstance();
    const wallet = walletOfProvider(ACCOUNT_PRIVATEKEY, provider);
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const response = await contract.safeTransferFrom(
        ACCOUNT_ADDRESS,
        ACCOUNT_ADDRESS_SECONDARY,
        id,
        amount,
        '0x'
    );
    console.log('response', response);
    response.wait()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error);
}

run(1, 10);
