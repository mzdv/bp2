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
            conn.execute('SELECT * FROM KLIJENT',
                (err, res) => {
                    if (err) {
                        console.error(err.message);
                        sqlutil.release(conn);
                        return;
                    } else {
                        console.log(table(sqlutil.formatData(res.metaData, res.rows)));

                        conn.execute('SELECT * FROM RACUN',
                            (err, res) => {
                                if (err) {
                                    console.error(err.message);
                                    sqlutil.release(conn);
                                    return;
                                } else {
                                    console.log(table(sqlutil.formatData(res.metaData, res.rows)));

                                    conn.execute('ALTER TRIGGER KLIJENT_BLOCK_BU COMPILE', (err, res) => {
                                        if (err) {
                                            console.error(err.message);
                                            sqlutil.release(conn);
                                            return;

                                        } else {
                                            conn.execute("UPDATE RACUN SET SIFRAKLIJENTA=1111 WHERE SIFRA=9999",
                                                (err, res) => {
                                                    if (err) {
                                                        console.error(err.message);
                                                        sqlutil.release(conn);
                                                    } else {
                                                        conn.execute('SELECT * FROM RACUN',
                                                            (err, res) => {
                                                                if (err) {
                                                                    console.error(err.message);
                                                                    sqlutil.release(conn);
                                                                } else {
                                                                    console.log(table(sqlutil.formatData(res.metaData, res.rows)));
                                                                    conn.execute("UPDATE RACUN SET IME='Marko' WHERE SIFRA=9999",
                                                                        (err, res) => {
                                                                            if (err) {
                                                                                console.error(err.message);
                                                                                sqlutil.release(conn);
                                                                            } else {
                                                                                sqlutil.release(conn);
                                                                            }
                                                                        });
                                                                }
                                                            });
                                                    }
                                                });
                                        }
                                    });
                                }
                            });
                    }
                });
        }
    });
}


