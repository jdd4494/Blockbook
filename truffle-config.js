var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "WXY3CSikGF7psACSRfyF";
var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
var address = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
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
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey)
      },
      network_id: 3,
      from: address,
      gas: 4700388
    }
  }
};
