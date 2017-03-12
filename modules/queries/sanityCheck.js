var oracledb = require('oracledb');
var dbconf = require('../dbconf');
var sqlutil = require('./sqlutil');

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
                        sqlutil.release(conn);
                        return;
                    } else {
                        console.log(res.metaData);
                        console.log(res.rows);
                        sqlutil.release(conn);
                    }
                });
        }
    });
}

