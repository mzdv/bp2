var oracledb = require('oracledb');
var { table } = require('table');

var dbconf = require('../dbconf');
var sqlutil = require('./sqlutil');

module.exports = function () {
    oracledb.getConnection(dbconf, (err, conn) => {
        if (err) {
            console.error(err.message);
            return;
        } else {
            conn.execute('SELECT * FROM ZAHTEVZAPONUDU',
                (err, res) => {
                    if (err) {
                        console.error(err.message);
                        sqlutil.base.releaseConnection(conn);
                        return;
                    } else {
                        console.log(table(sqlutil.formatData(res.metaData, res.rows)));
                        sqlutil.base.releaseConnection(conn);
                    }
                });
        }
    });
}
