var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "6eXyHFMdamfLrf5pGfrH";
var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
var address = "0x627306090abab3a6e1400e9345bc60c78a8bef57";

module.exports = {
  solc: {
      optimizer: {
          enabled: true,
          runs: 200
      }
  },
  networks: {
    development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "*", // Match any network id
    },
    ropsten: {
      provider: function() {
          return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey)
      },
      network_id: 3,
      from: address,
      gas: 4700388
    }
  }
};
