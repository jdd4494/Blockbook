App = {
    web3Provider: null,
    contracts: {},

    init: function () {

        return App.initWeb3();
    },

    initWeb3: function () {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {
        $.getJSON('MessagePost.json', function (data) {
            var MessagePostArtifact = data;
            App.contracts.MessagePost = TruffleContract(MessagePostArtifact);
            App.contracts.MessagePost.setProvider(App.web3Provider);

            console.log("Init message post contract");
            _displayMessages();
        });

        $.getJSON('SpeechToken.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var SpeechTokenArtifact = data;
            App.contracts.SpeechToken = TruffleContract(SpeechTokenArtifact);

            // Set the provider for our contract
            App.contracts.SpeechToken.setProvider(App.web3Provider);

            // Get the initial account balance so it can be displayed.
            web3.eth.getAccounts(function (err, accs) {
                if (err != null) {
                    alert("There was an error fetching your accounts.");
                    return;
                }

                if (accs.length == 0) {
                    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                    return;
                }

                accounts = accs;
                account = accounts[0];

                return App.refreshBalance();
            });
        });

        return App.bindEvents();
    },

    refreshBalance: _refreshBalance,
    sendCoin: _sendCoin,
    postMessage: _postMessage,
    displayMessages: _displayMessages,

    bindEvents: function () {
        // $(document).on('click', '.btn-adopt', App.handleAdopt);
    },

};

// Displays Current Account Balance
function _refreshBalance() {
    var self = this;

    var meta;
    App.contracts.SpeechToken.deployed().then(function (instance) {
        meta = instance;
        console.log("current account: " + account);
        return meta.balanceOf.call(account, { from: account });
    }).then(function (value) {
        console.log("current account balance: " + value);

        // Displays Balance
        var balance_element = document.getElementById("balance");
        balance_element.innerHTML = value.valueOf();

        // Get Balance In Etherium
        _getBalanceInEth();
    }).catch(function (e) {
        console.log(e.message);
    });
}

// Show Balance In Etherium
function _getBalanceInEth() {
    App.contracts.SpeechToken.deployed().then(function (instance) {
        meta = instance;
        console.log("current account: " + account);
        return meta.getBalanceInEth.call(account, { from: account });
    }).then(function (value) {
        console.log("current account balance in ETH: " + value);
        var balance_element = document.getElementById("eth-balance");
        balance_element.innerHTML = value.valueOf();

    }).catch(function (e) {
        console.log(e.message);
    });
}

// Post Message On Board
function _postMessage() {
    var self = this;
    var meta;

    var header = document.getElementById("msg_header").value;
    var body = document.getElementById("msg_body").value;
    var date = new Date().toString();
    console.log("Post message attempt: " + header + " body: " + body + " date: " + date);
    App.contracts.MessagePost.deployed().then(function (instance) {
        meta = instance;
        //console.log("Do i get here");
        return meta.createMessage(header, body, account);
    }).then(function (result) {
        console.log("message posted");
        _displayMessages();
    }).catch(function (e) {
        console.log(e.message);
    });
}

// Display Messsage Posts
function _displayMessages() {
    var meta;

    console.log("(_displayMessages)");
    App.contracts.MessagePost.deployed().then(function (instance) {
        meta = instance;
        console.log("DO I GET HERE?");
        return meta.getMessageLength.call();
    }).then(function (result) {
        console.log("num messages " + result);
        _grabMessage(result, 0);
    }).catch(function (err) {
        console.log(err.message);
    });
}

// Grabs Each Message
function _grabMessage(totalMsg, i) {
    if (i >= totalMsg) {
        console.log("reached end of messages");
        return;
    }

    var tMsgId = i;
    var meta;

    App.contracts.MessagePost.deployed().then(function (instance) {
        meta = instance;

        return meta.getMessage.call(tMsgId);
    }).then(function (result) {
        console.log(result);

        var message = $('#messages');
        var messageTemplate = $('#messageTemplate');

        messageTemplate.find('.panel-title').text(result[0]);
        messageTemplate.find('.msg-body').text(result[1]);
        messageTemplate.find('.panel-date').text(result[2]);
        messageTemplate.find('.msg-owner').text(result[2]);

        message.append(messageTemplate.html());

        i++;
        _grabMessage(totalMsg, i);
    }).catch(function (err) {
        console.log(err.message);
    });
}

// Send Coin To Another Account
function _sendCoin() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    //this.setStatus("Initiating transaction... (please wait)");

    console.log("amount: " + amount + " receiver: " + receiver);

    var meta;
    App.contracts.SpeechToken.deployed().then(function (instance) {
        meta = instance;

        return meta.transferFrom(account, receiver, amount, { from: account });
    }).then(function (result) {
        //self.setStatus("Transaction complete: " + result);
        self.refreshBalance();
    }).catch(function (e) {
        self.setStatus(e.message);
        console.log(e.message);
    });
}

$(function () {
    $(window).load(function () {
        App.init();
    });
});
