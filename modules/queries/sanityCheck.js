let oracledb = require('oracledb');
let { table } = require('table');

let dbconf = require('../dbconf');
let parametrizedQueries = require('../parametrizedQueries');
let sqlutil = require('../sqlutil');

let statements = {
    amIReal: function() {
        sqlutil.transactions.readTable(
            parametrizedQueries.sanityCheck.amIReal,
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

