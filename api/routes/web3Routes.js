'use strict';
module.exports = function(app) {
    var web3Routes = require('../controllers/web3Controller');

    //Helloworld Routes
    app.route('/addNewMember')
    .post(web3Routes.addNewMember);

    app.route('/addtoAccum')
    .post(web3Routes.addtoAccum);

    app.route('/find')
    .get(web3Routes.findMember);
}
