let readline = require('readline');

let oracledb = require('oracledb');
let { table } = require('table');

let dbconf = require('../dbconf');
let parametrizedQueries = require('../parametrizedQueries');
let sqlutil = require('../sqlutil');

let statements = {
    selectOne: function () {
        let rl = readline.createInterface({
            input: process.stdin
        });

        console.log('Unesite id:\n');

        rl.on('line', (line) => {
            resultData.push(+line);
            rl.close();

            oracledb.getConnection(dbconf, (err, conn) => {
                if (err) {
                    console.error(err.message);
                    return;
                } else {
                    conn.execute(parametrizedQueries.structuredType.selectOne, [resultData[0]],
                        (err, res) => {
                            if (err) {
                                console.error(err.message);
                                sqlutil.base.releaseConnection(conn);
                                return;
                            } else {
                                resultData.push(res.rows[0][0]);
                                conn.execute(parametrizedQueries.structuredType.serialNumber.selectOne, [resultData[0]], (err, res) => {
                                    if (err) {
                                        console.error(err.message);
                                        sqlutil.base.releaseConnection(conn);
                                    } else {
                                        resultData.push(res.rows[0][0]);
                                        conn.execute(parametrizedQueries.structuredType.laboratory.selectOne, [resultData[0]], (err, res) => {
                                            if (err) {
                                                console.error(err.message);
                                                sqlutil.base.releaseConnection(conn);
                                            } else {
                                                resultData.push(res.rows[0][0]);
                                                conn.execute(parametrizedQueries.structuredType.content.selectOne, [resultData[0]], (err, res) => {
                                                    if (err) {
                                                        console.error(err.message);
                                                        sqlutil.base.releaseConnection(conn);
                                                    } else {
                                                        resultData.push(res.rows[0][0]);
                                                        console.log(table([headers, resultData]));
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
        });
    },
    selectAll: function () {
        let headers = [['Sifra'], ['Datum'], ['Serijski broj'], ['Laboratorija'], ['Sadrzaj']];
        let resultData = [];

        oracledb.getConnection(dbconf, (err, conn) => {
            if (err) {
                console.error(err.message);
                return;
            } else {
                conn.execute(parametrizedQueries.structuredType.selectAll,
                    (err, res) => {
                        if (err) {
                            console.error(err.message);
                            sqlutil.base.releaseConnection(conn);
                            return;
                        } else {
                            resultData.push(res.rows[0]);
                            conn.execute(parametrizedQueries.structuredType.serialNumber.selectAll, (err, res) => {
                                if (err) {
                                    console.error(err.message);
                                    sqlutil.base.releaseConnection(conn);
                                } else {
                                    resultData.push(res.rows[0]);
                                    conn.execute(parametrizedQueries.structuredType.laboratory.selectAll, (err, res) => {
                                        if (err) {
                                            console.error(err.message);
                                            sqlutil.base.releaseConnection(conn);
                                        } else {
                                            resultData.push(res.rows[0]);
                                            conn.execute(parametrizedQueries.structuredType.content.selectAll, (err, res) => {
                                                if (err) {
                                                    console.error(err.message);
                                                    sqlutil.base.releaseConnection(conn);
                                                } else {
                                                    resultData.push(res.rows[0]);
                                                    console.log(table([headers, resultData]));
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
    },
    create: function (sifra, serijskiBroj, laboratorija, sadrzaj, datum) {
        let rl = readline.createInterface({
            input: process.stdin
        });

        console.log('Unesite sifra,serijskiBroj,laboratorija,sadrzaj,datum sa zarezima:\n');

        rl.on('line', (line) => {
            let params = line.split(',');
            rl.close();

            sqlutil.transactions.modifyTable(
                parametrizedQueries.structuredType.create,
                [+params[0], +params[1], params[2], params[3], params[4]],
                (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(res);
                    }
                });
        });
    },
    update: function (column, value, id) {
        let rl = readline.createInterface({
            input: process.stdin
        });

        console.log('Unesite column,value,id sa zarezima:\n');

        rl.on('line', (line) => {
            let params = line.split(',');
            rl.close();

            sqlutil.transactions.modifyTable(
                parametrizedQueries.structuredType.update,
                [params[0], +params[1], +params[2]],
                (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(res);
                    }
                });
        });
    },
    deleteOne: function (id) {
        let rl = readline.createInterface({
            input: process.stdin
        });

        console.log('Unesite id:\n');

        rl.on('line', (line) => {
            let id = +line;

            sqlutil.transactions.modifyTable(
                parametrizedQueries.structuredType.deleteAll,
                [id],
                (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(res);
                    }
                });
        });
    },
    deleteAll: function () {
        sqlutil.transactions.modifyTable(
            parametrizedQueries.structuredType.deleteAll,
            (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(res);
                }
            });
    }
};

module.exports = statements;
