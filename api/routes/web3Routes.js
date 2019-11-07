'use strict';
module.exports = function(app) {
    var web3Routes = require('../controllers/web3Controller');

    //Helloworld Routes
    app.route('accum/addNewMember')
    .post(web3Routes.addNewMember);

    app.route('accum/addtoAccum')
    .post(web3Routes.addtoAccum);

    app.route('/accum/find')
    .get(web3Routes.findMember);

    var helloWorld = require('../controllers/helloBlockchainController');

    //Helloworld Routes
    app.route('/getMessage')
    .get(helloWorld.read_Message);

    app.route('/getHello')
    .get(helloWorld.read_Hello);
}
