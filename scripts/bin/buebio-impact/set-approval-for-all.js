'use strict';
require('dotenv').config();
const {ethersInstance, loadContract, walletOfProvider} = require('../../utils/ethers');
const CONTRACT_ADDRESS = process.env.CONTRACT_BUEBIOIMPACT_ADDRESS;
const CONTRACT_ABI = require('../../../abi/contracts/buebio-impact.sol/BuebioImpact.json');

async function run(privateKey, toWallet, approved) {
    const provider = ethersInstance();
    const wallet = walletOfProvider(privateKey, provider);
    const contract = loadContract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const response = await contract.setApprovalForAll(
        toWallet,
        approved
    );
    console.log('response', response);
    response.wait()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error);
}

console.log('---- BuebioImpact - setApprovalForAll');
run(
    'a6a6c8730f880d1448af6f40e77235d1629c62271de240aa04fc5bfffe2e298d', // privateKey
    '0xE20f7eE0064CD832674E6B2979Ecd89662c6c6D1', // toWallet: wallet to receive permissions
    true, // approved: if true it will grant permissions, if false it will revoke permissions
);
