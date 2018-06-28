var ConvertLib = artifacts.require("./ConvertLib.sol");
var SpeechToken = artifacts.require("./SpeechToken.sol");
var MessagePost = artifacts.require("./MessagePost.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, SpeechToken);
  deployer.deploy(SpeechToken); // Passing the total amount of coins, since our initializer method requires
  deployer.deploy(MessagePost);
};
