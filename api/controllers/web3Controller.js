const web3Service = require("./../services/web3Services");
const respHandler = require("./../services/responseHandler");
const _ = require("lodash")
var parseString = require('xml2js').parseString;
var crypto = require('crypto');

exports.addNewMember = async function(req,res){
    let data = req.body.member;
    console.log('Data ',data);
    parseString(data, async function(err,result){
    if(err) console.log("Error in Parsing Result",err);
    console.log("Result is ",result);
    let newMember = result.CHADJDCL_GEN_AREA;
    //console.log("TCL: newMember", newMember)
    console.log("TCL: newMember", newMember)
    let first_name = newMember.CHDR_INSD_FST_NM;
    let last_name = newMember.CHDR_INSD_LST_NM;
    let dob = newMember.CHDR_EE_BTH_DT;
    let patient_id = newMember.CHDR_PTNT_ADJ_SYS_ID;
    let member_id = newMember.CHDR_PTNT_MED_SYS_ID;
    let accum_start_date = newMember.CHDR_ACCUM_STRT_DT;
    let accum_end_date = newMember.CHDR_ACCUM_END_DT;

    dob = dob[0].replace(/-/g,"");
    accum_start_date = accum_start_date[0].replace(/-/g,"");
    accum_end_date = accum_end_date[0].replace(/-/g,"");

    let member_sha = first_name[0].concat(last_name[0],dob);
    console.log("TCL: member_sha", member_sha)
    let member_sha_hash = crypto.createHash('sha256').update(member_sha).digest('hex');
    member_sha_hash = "0x"+member_sha_hash;
    console.log("TCL: member_sha_hash", member_sha_hash)

    console.log("fn, ln,dob, pid,mid,asd,aed,sha", first_name, last_name, dob,patient_id,member_id,accum_start_date,accum_end_date, member_sha_hash);
    let result_final = await web3Service.addNewMember(member_sha_hash,first_name[0], last_name[0], dob,patient_id[0],member_id[0],accum_start_date,accum_end_date);
    if (!result_final)
      return respHandler("Error in fetching response", req, res, null);
    return respHandler(null, req, res, result_final);
})
};

exports.addtoAccum = async function(req,res){
    let data = req.body.member;
    let memberHash = req.body.memberSha;
    parseString(data, async function(err,result){
    if(err) console.log("Error in Parsing Result",err);
    console.log("Result is ",result);
    // let jsonData = parser.toJson(result);
    // console.log('DAta sis ',jsonData);
    // data = JSON.parse(jsonData);
    let accumObj = result.CHADJDCL_GEN_AREA;;
    console.log("TCL: accumObj", accumObj)
    let inAmt = accumObj.CHDR_ACCUM_IND_APPLIED;
    inAmt =_.ceil(inAmt[0]);
    let outAmt = accumObj.CHDR_ACCUM_IND_PLN_AMT;
    outAmt =_.ceil(outAmt[0]);
    let inopAmt = accumObj.CHDR_ACCUM_FAM_APPLIED;
    inopAmt =_.ceil(inopAmt[0]);
    let outopAmt = accumObj.CHDR_ACCUM_FAM_PLN_AMT;
    outopAmt =_.ceil(outopAmt[0]);
    let membersha = memberHash;
      console.log('The Values are ',inAmt, outAmt);

    let result_final = await web3Service.addtoAccum(
      membersha,
      inAmt,
      outAmt,
      inopAmt,
      outopAmt
    );

    if (!result_final) return respHandler("Error in getting result", req, res, null);
    return respHandler(null, req, res, result_final);
})
};

exports.findMember =  function(req,res){
    let membersha = _.get(req.query,"memberSha");
  console.log("TCL: membersha", membersha)
  try{
  let findMemberpromise =  web3Service.findMember(membersha);

  findMemberpromise.then(
    function(result){
    return respHandler(null, req, res, result)
    },
    function(err){
     respHandler("Error Cannot find member from user", req, res, null)
    });  
  }
  catch(err){
    console.error(err);
  }
}