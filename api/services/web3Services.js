const fs = require('fs');
const Web3 = require('web3');
const path = require("path");
const jsonFile = path.resolve(__dirname,"./../abis/Accums.json");
const parsed= JSON.parse(fs.readFileSync(jsonFile));
const abi = parsed.abi; 
var web3 = new Web3(); 

web3 = new Web3(new Web3.providers.HttpProvider("https://accumdev.blockchain.azure.com:3200/ajkJzpNwg0SihtLDBc1dFTQC"));
const contract = new web3.eth.Contract(abi,"0xc6cD14dD03C4FD88fa12ef473894aa113d565858");
const address = "0x64218B699F47DB358CfD52e308Cac8D22E568681";

//local ganache
/* web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const contract = new web3.eth.Contract(abi,"0x65BB26Ec8f2BBBcdc0086a454e2F4B224867cC9B");
const address = "0x64218B699F47DB358CfD52e308Cac8D22E568681" */

async function findMember(memberId) {
    console.log("Entering findMember > ",memberId);    
      let promise= contract.methods.findMember(memberId).call();
      return promise;
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
            from: address,
            gas: 2500000
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
            console.log("transaction hash is",hash);
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
    });
}


// async function addNewMember(member_sha_hash,first_name, last_name, dob,patient_id,member_id,accum_start_date,accum_end_date){
//     console.log('vm>>>>>>>>>>>     ');
//     console.log(">>>>>>>>>>>>>",member_sha_hash,first_name, last_name, dob,patient_id,member_id,accum_start_date,accum_end_date)
    
//     let promise = contract.methods.setUuidNew(member_sha_hash,first_name, last_name, dob,patient_id,member_id,accum_start_date,accum_end_date)
//     .send({ from: address})
//     .on('transactionHash', function(hash){
//         console.log("hash is: ",hash);
//     })
//     .on('confirmation', function(confirmationNumber, receipt){
//         console.log(confirmationNumber);
//         console.log("receipt: ",receipt);
//     })
//     .on('receipt', function(receipt) {
//         console.log("receipt is: ",receipt);
//     })
//     .on('error', console.error);    

//     console.log("promise is: ",promise);
//     return promise;
// }

module.exports = {
    findMember,
    attachAlias,
    addtoAccum,
    addNewMember
}