var fs = require('fs');


 //local
//var jsonFile = "C:/Users/pkorrap2/Repos/Examples/Parity_ExternalAPI/api/abis/NameContract.json";
var jsonFile = "/home/site/wwwroot/api/abis/NameContract.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
var Web3 = require('web3'); // gets the Web3 object, which is a function constructor
var web3 = new Web3(); // instantiate Web3 to get a new object

//local ganache
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// const nameContract = new web3.eth.Contract(abi,"0x71bea930da94A8Fd86AF6C92cbEF85C1e11c6E9D");
// const address = "0x5D48eD28f27b2e8F6aaf739B6C70d72a009E8DdE"

//azure
web3 = new Web3(new Web3.providers.HttpProvider("https://accumdev.blockchain.azure.com:3200/tDkJ9wCAAbIvUQgDsoevdabu"));
const nameContract = new web3.eth.Contract(abi,"0x62092Ec2cb682B07E9BD5Ad428ff2D0aB870b91b");
const address = "0x3115B113c11Be2140996B4AA690CC0c6010C9D7a"


exports.get_name = function(req, res) {

    console.log("before calling get method smart contract");
    
    nameContract.methods.getName().call((err, result) => 
     { 
        
         console.log(result);
        res.send(result);
         });

         console.log("after calling get method smart contract");
};

exports.set_name = function(req, res) {

    console.log("before calling set method smart contract");
    
    nameContract.methods.setName(req.body).send(
        {from: address},
        (err, result) => 
     { 
        
         console.log(result);
        res.send(result);
         });

         console.log("after calling set method of smart contract");
};