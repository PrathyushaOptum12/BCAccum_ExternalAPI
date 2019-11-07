var fs = require('fs');

 var jsonFile = "/home/site/wwwroot/api/abis/HelloBlockchain.json";
 //var jsonFile = "C:/Users/pkorrap2/Repos/Examples/HelloNodeJsAPI/api/abis/HelloBlockchain.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
var Web3 = require('web3'); // gets the Web3 object, which is a function constructor
var web3 = new Web3(); // instantiate Web3 to get a new object

///using web socket provider
//web3 = new Web3(new Web3.providers.WebsocketProvider("wss://accumdev.blockchain.azure.com:3300/ajkJzpNwg0SihtLDBc1dFTQC"));

web3 = new Web3(new Web3.providers.HttpProvider("https://accumdev.blockchain.azure.com:3200/tDkJ9wCAAbIvUQgDsoevdabu"));
var helloBlockchainContract = new web3.eth.Contract(abi,"0xc3DF3b7740040Af900e85E9F9a268AD2C7aFB277");

//local ganache connection
//web3Local = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//var helloBlockchainLocalContract = new web3Local.eth.Contract(abi,"0xEA04A65E212903A8411AFF832E0126Fd502EFbc1");

//console.log("===caling HelloBlockchain smart contract===");
exports.read_Message = function(req, res) {

    console.log("before calling smart contract");
    
    helloBlockchainContract.methods.getMessage().call((err, result) => 
     { 
         console.log(result);
        res.send(result);
         });

         console.log("after calling smart contract");
};

exports.read_Hello = function(req, res) {
    res.send("hello blockchain first");
};