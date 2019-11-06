var fs = require('fs');

 var jsonFile = "C:/Users/pkorrap2/Repos/Examples/HelloNodeJsAPI/api/abis/HelloBlockchain.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
var Web3 = require('web3'); // gets the Web3 object, which is a function constructor
var web3 = new Web3(); // instantiate Web3 to get a new object

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var helloWorldContract = new web3.eth.Contract(abi,"0xc3DF3b7740040Af900e85E9F9a268AD2C7aFB277");
console.log("===caling HelloWorld smart contract===");

function callHelloWorld()
{
  //helloWorldContract.methods.hi().call((err, result) => { console.log(result) });
  helloWorldContract.methods.getMessage().call((err, result) => { return result });
}