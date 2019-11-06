const fs = require('fs');
const Web3 = require('web3');
const path = require("path");
const jsonFile = path.resolve(__dirname,"./../abis/Accums.json");
const parsed= JSON.parse(fs.readFileSync(jsonFile));
const abi = parsed.abi; // gets the Web3 object, which is a function constructor
var web3 = new Web3(); // instantiate Web3 to get a new object
web3 = new Web3(new Web3.providers.WebsocketProvider("wss://accumdev.blockchain.azure.com:3300/ajkJzpNwg0SihtLDBc1dFTQC"));
const contract = new web3.eth.Contract(abi,"0xc6cD14dD03C4FD88fa12ef473894aa113d565858");

const address = "0x3115B113c11Be2140996B4AA690CC0c6010C9D7a"

// const SignerProvider = require('ethjs-provider-signer');
// const sign = require('ethjs-signer').sign;
// const address = web3configJson.accounts[0];
// console.log("TCL: address", address)
// const FaucetPrivateKey = web3configJson.FaucetPrivateKey[0];
// console.log("TCL: FaucetPrivateKey", FaucetPrivateKey)

// console.log(">>>>>>>>>>>>>",web3configJson.rpc_url)

// const provider = new SignerProvider(
//     web3configJson.rpc_url,
//     {
//         signTransaction: (rawTx, cb) =>
//             cb(null, sign(rawTx, FaucetPrivateKey)),
//         accounts: cb => cb(null, [address])
//     }
// );
// const web3 = new Web3(provider);

// const file2 = path.resolve(__dirname, "./../blockchain/build/contracts/Accums.json");
// // console.log("TCL: file2", file2.abi)
// const parsed = JSON.parse(fs.readFileSync(file2));
// const contractaddress = web3configJson.contract_address[0];
// const contract = new web3.eth.Contract(parsed.abi, contractaddress);

async function findMember(memberId) {

    return new Promise((resolve, reject)=>{
        contract.methods.findMember(memberId).call({
            from: address,
            gas:0
        }, (err, result) => {
            if (err) {
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>");
                reject(err);
            }
            else{
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<");
                resolve(result);
            }
        })
    }).catch(function(error){
        console.log("Error We Got in Blockchain Transaction is ",error)
    })
    
}
async function attachAlias(newId, existingId) {

    return new Promise((resolve, reject)=>{
        console.log("Attach ALias.....")
    contract.methods.attachAlias(newId, existingId)
        .send({
            from: address
        })
        .on('transactionHash', function(hash) {
            console.log(hash)
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log("Confirmed", confirmationNumber, receipt);
        })
        .on('receipt', function(receipt) {
            resolve(receipt)
        })
        .on("error", function(error) {
            reject(error);
        });

    }).catch(function(error){
        console.log("Error We Got in Blockchain Transaction is ",error)
    })
    
}
async function addtoAccum(memberSha, inAmt, outAmt, inopAmt, outopAmt) {
    console.log(memberSha, inAmt, outAmt, inopAmt, outopAmt);
    return new Promise((resolve, reject)=>{
        contract.methods.add2Accum(memberSha, inAmt, outAmt, inopAmt, outopAmt)
        .send({
            from: address
        })
        .on('transactionHash', function(hash) {
            console.log(hash)
        })
        .on('receipt', function(receipt) {
            
            return resolve(receipt)
            
        })
        .on("error", function(error) {
            return reject(error);
        });

    }).catch(function(error){
        console.log("Error We Got in Blockchain Transaction is ",error)
    })
}
async function addNewMember(member_sha_hash,first_name, last_name, dob,patient_id,member_id,accum_start_date,accum_end_date){
    console.log('vm>>>>>>>>>>>     ');
    console.log(">>>>>>>>>>>>>",member_sha_hash,first_name, last_name, dob,patient_id,member_id,accum_start_date,accum_end_date)
    return new Promise((resolve, reject)=>{
        contract.methods.setUuidNew(member_sha_hash,first_name, last_name, dob,patient_id,member_id,accum_start_date,accum_end_date)
        .send({
            from: address
        })
        .on('transactionHash', function(hash) {
            resolve(hash)
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            resolve("Confirmed", confirmationNumber, receipt);
        })
        .on('receipt', function(receipt) {
            resolve(receipt)
        })
        .on("error", function(error) {
            reject("Error",error);
        });
    }).catch(function(error){
        console.log("Error We Got in Blockchain Transaction is ",error)
    })
}

module.exports = {
    findMember,
    attachAlias,
    addtoAccum,
    addNewMember
}