require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: [process.env.ACCOUNT_PRIVATEKEY]
    },
    remote: {
      url: process.env.NETWORK_RPC,
      accounts: [process.env.ACCOUNT_PRIVATEKEY]
    }
  },
  abiExporter: {
    path: './abi',
    pretty: false,
    clear: true,
  }
};
