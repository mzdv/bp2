let oracledb = require('oracledb');

let dbconf = require('../dbconf');
let parametrizedQueries = require('../parametrizedQueries');
let sqlutil = require('../sqlutil');

let statements = {
    amIReal: function() {
        sqlutil.transactions.perform(
            parametrizedQueries.sanityCheck.amIReal,
            null,
            (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(res);
                }
            });
    }
}

module.exports = statements;

