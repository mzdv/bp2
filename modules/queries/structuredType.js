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

        console.log('Unesite id:');

        rl.on('line', (line) => {
            resultData.push(+line);
            rl.close();

            /*
            *   This part below is very ugly. I don't like it, but it is a 
            *   necessity at this point. It can be refactored with multiple
            *   calls to the database in sequence (even parallel calls might
            *   work since they're all read operations).
            *   The same applies for selectAll beneath this function.
            */

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
    create: function () {
        let rl = readline.createInterface({
            input: process.stdin
        });

        console.log('Unesite sifra,serijskiBroj,laboratorija,sadrzaj,datum sa zarezima:');

        rl.on('line', (line) => {
            let params = line.split(',');
            rl.close();

            sqlutil.transactions.perform(
                parametrizedQueries.structuredType.create,
                [+params[0], +params[1], params[2], params[3], Date(params[4])],
                (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(res);
                    }
                });
        });
    },
    update: function () {
        let rl = readline.createInterface({
            input: process.stdin
        });

        console.log('Unesite column,value,id sa zarezima:');

        rl.on('line', (line) => {
            let params = line.split(',');
            rl.close();

            if(params[0] === 'datum') {
                params[1] = Date(params[1]);
            }

            sqlutil.transactions.perform(
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
    deleteOne: function () {
        let rl = readline.createInterface({
            input: process.stdin
        });

        console.log('Unesite id:');

        rl.on('line', (line) => {
            let id = +line;

            sqlutil.transactions.perform(
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
        sqlutil.transactions.perform(
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
