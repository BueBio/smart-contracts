const {ethers} = require('ethers');

function loadContract(contractAddress, abi, provider) {
  return new ethers.Contract(contractAddress, abi, provider);
}

function ethersInstance() {
  return new ethers.providers.JsonRpcProvider(process.env.NETWORK_RPC);
}

function walletOfProvider(privateKey, provider) {
  return new ethers.Wallet(privateKey, provider);
}

module.exports = {
  loadContract,
  ethersInstance,
  walletOfProvider
};