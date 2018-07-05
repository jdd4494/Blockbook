pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SpeechToken.sol";
import "../contracts/MessagePost.sol";


contract TestSpeechToken{
    SpeechToken meta = SpeechToken(DeployedAddresses.SpeechToken());

    // Test to see if auction creation works
    function testSpeechToken() public {

    }
}
