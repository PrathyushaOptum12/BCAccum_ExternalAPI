'use strict';
module.exports = function(app) {
    var web3Routes = require('../controllers/web3Controller');

    //Helloworld Routes
    app.route('/accum/addNewMember')
    .post(web3Routes.addNewMember);

    app.route('/accum/addtoAccum')
    .post(web3Routes.addtoAccum);

    app.route('/accum/find')
    .get(web3Routes.findMember);

    var helloBlockchain = require('../controllers/helloBlockchainController');

    //HelloBlockchain Routes
    app.route('/getMessage')
    .get(helloBlockchain.read_Message);

    app.route('/sendMessage')
    .post(helloBlockchain.send_Message);


    var nameControllerObj = require('../controllers/nameController');
    //name contract
    app.route('/getName')
    .get(nameControllerObj.get_name);

    app.route('/setName')
    .post(nameControllerObj.send_name);
}
