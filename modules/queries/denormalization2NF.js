let oracledb = require('oracledb');
let { table } = require('table');

let dbconf = require('../dbconf');
let sqlutil = require('../sqlutil');

module.exports = function () {
    oracledb.getConnection(dbconf, (err, conn) => {
        if (err) {
            console.error(err.message);
            return;
        } else {
            conn.execute('SELECT * FROM STAVKAPONUDE WHERE SIFRA=1222',
                (err, res) => {
                    if (err) {
                        console.error(err.message);
                        sqlutil.base.releaseConnection(conn);
                        return;
                    } else {
                        console.log(table(sqlutil.base.formatData(res.metaData, res.rows)));

                        conn.execute('SELECT * FROM STAVKAPONUDE WHERE SIFRA=1222',
                            (err, res) => {
                                if (err) {
                                    console.error(err.message);
                                    sqlutil.base.releaseConnection(conn);
                                    return;
                                } else {
                                    console.log(table(sqlutil.base.formatData(res.metaData, res.rows)));

                                    conn.execute('ALTER TRIGGER PONUDA_AU COMPILE', (err, res) => {
                                        if (err) {
                                            console.error(err.message);
                                            sqlutil.base.releaseConnection(conn);
                                            return;

                                        } else {
                                            conn.execute("UPDATE PONUDA SET NASLOV='Parking servis' WHERE SIFRA=123456",
                                                (err, res) => {
                                                    if (err) {
                                                        console.error(err.message);
                                                        sqlutil.base.releaseConnection(conn);
                                                    } else {
                                                        conn.execute('SELECT * FROM PONUDA WHERE SIFRA=123456',
                                                            (err, res) => {
                                                                if (err) {
                                                                    console.error(err.message);
                                                                    sqlutil.base.releaseConnection(conn);
                                                                } else {
                                                                    console.log(table(sqlutil.base.formatData(res.metaData, res.rows)));
                                                                    conn.execute('SELECT * FROM STAVKAPONUDE WHERE SIFRA=1222',
                                                                        (err, res) => {
                                                                            if (err) {
                                                                                console.error(err.message);
                                                                                sqlutil.base.releaseConnection(conn);
                                                                            } else {
                                                                                console.log(table(sqlutil.base.formatData(res.metaData, res.rows)));
                                                                                conn.execute("UPDATE STAVKAPONUDE SET NASLOV = 'APR' WHERE SIFRA=1222",
                                                                                    (err, res) => {
                                                                                        if (err) {
                                                                                            console.log(err.message);
                                                                                            sqlutil.base.releaseConnection(conn);
                                                                                        } else {
                                                                                            console.log(table(sqlutil.base.formatData(res.metaData, res.rows)));
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
    });
}


