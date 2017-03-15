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
            conn.execute('SELECT * FROM KLIJENT',
                (err, res) => {
                    if (err) {
                        console.error(err.message);
                        sqlutil.base.releaseConnection(conn);
                        return;
                    } else {
                        console.log(table(sqlutil.formatData(res.metaData, res.rows)));

                        conn.execute('SELECT * FROM RACUN',
                            (err, res) => {
                                if (err) {
                                    console.error(err.message);
                                    sqlutil.base.releaseConnection(conn);
                                    return;
                                } else {
                                    console.log(table(sqlutil.formatData(res.metaData, res.rows)));

                                    conn.execute('ALTER TRIGGER KLIJENT_BLOCK_BU COMPILE', (err, res) => {
                                        if (err) {
                                            console.error(err.message);
                                            sqlutil.base.releaseConnection(conn);
                                            return;

                                        } else {
                                            conn.execute("UPDATE RACUN SET SIFRAKLIJENTA=1111 WHERE SIFRA=9999",
                                                (err, res) => {
                                                    if (err) {
                                                        console.error(err.message);
                                                        sqlutil.base.releaseConnection(conn);
                                                    } else {
                                                        conn.execute('SELECT * FROM RACUN',
                                                            (err, res) => {
                                                                if (err) {
                                                                    console.error(err.message);
                                                                    sqlutil.base.releaseConnection(conn);
                                                                } else {
                                                                    console.log(table(sqlutil.formatData(res.metaData, res.rows)));
                                                                    conn.execute("UPDATE RACUN SET IME='Marko' WHERE SIFRA=9999",
                                                                        (err, res) => {
                                                                            if (err) {
                                                                                console.error(err.message);
                                                                                sqlutil.base.releaseConnection(conn);
                                                                            } else {
                                                                                sqlutil.base.releaseConnection(conn);
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


