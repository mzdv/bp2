let oracledb = require('oracledb');
let { table } = require('table');

let dbconf = require('../dbconf');
let sqlutil = require('./sqlutil');

module.exports = function () {
    oracledb.getConnection(dbconf, (err, conn) => {
        if (err) {
            console.error(err.message);
            return;
        } else {
            conn.execute('SELECT "Sifra", "Ime" FROM "OdgovornoLice"',
                (err, res) => {
                    if (err) {
                        console.error(err.message);
                        sqlutil.base.releaseConnection(conn);
                        return;
                    } else {
                        console.log(table(sqlutil.base.formatData(res.metaData, res.rows)));
                        sqlutil.base.releaseConnection(conn);
                        return;
                    }
                });
        }
    });
}

