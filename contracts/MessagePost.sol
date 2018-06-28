pragma solidity ^0.4.18;

contract MessagePost {

    address public owner;

    struct Message{
        string header;
        string body;
        address owner;
    }

    // @dev Array containing all messages in existence
    Message[] messages;

    function MessagePost(){
        owner = msg.sender;
    }

    function createMessage(
        string _header,
        string _body,
        address _owner
    ) public returns (address){
        Message memory _msg = Message({
            header: _header,
            body:   _body,
            owner:  _owner
        });

        messages.push(_msg);

        return owner;
    }

    function getMessageLength() public returns (uint){
        return messages.length;
    }

    function getMessage(uint256 pos) public constant returns(string header, string body, address owner){
        Message storage msg = messages[pos];
        return (msg.header, msg.body, msg.owner);
    }
}
