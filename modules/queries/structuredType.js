var readline = require('readline');

var oracledb = require('oracledb');
var { table } = require('table');

var dbconf = require('../dbconf');
var sqlutil = require('./sqlutil');

let simpleQueries = {
    selectOne: 'SELECT "Datum" FROM "CarinskiDokument" WHERE "Sifra"=:id',
    selectAll: 'SELECT "Datum" FROM "CarinskiDokument"',
    create: 'INSERT INTO "CarinskiDokument" VALUES (:sifra, "obj_deklaracija"(:serijskiBroj, :laboratorija, :sadrzaj), :datum)',
    update: 'UPDATE "CarinskiDokument" SET :column = :value WHERE "Sifra"=:id',
    deleteOne: 'DELETE FROM "CarinskiDokument" WHERE "Sifra"=:id',
    deleteAll: 'TRUNCATE TABLE "CarinskiDokument"'
};

let declaration = {
    serialNumber: {
        selectAll: 'SELECT cd."Deklaracija".getSerijskiBroj() FROM "CarinskiDokument" cd',
        selectOne: 'SELECT cd."Deklaracija".getSerijskiBroj() FROM "CarinskiDokument" cd WHERE "Sifra"=:id'
    },
    laboratory: {
        selectAll: 'SELECT cd."Deklaracija".getLaboratorija() FROM "CarinskiDokument" cd',
        selectOne: 'SELECT cd."Deklaracija".getLaboratorija() FROM "CarinskiDokument" cd WHERE "Sifra"=:id'
    },
    content: {
        selectAll: 'SELECT cd."Deklaracija".getSadrzaj() FROM "CarinskiDokument" cd',
        selectOne: 'SELECT cd."Deklaracija".getSadrzaj() FROM "CarinskiDokument" cd WHERE "Sifra"=:id'
    }
};

let statements = {
    selectOne: function () {

        var rl = readline.createInterface({
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
                    conn.execute(simpleQueries.selectOne, [resultData[0]],
                        (err, res) => {
                            if (err) {
                                console.error(err.message);
                                sqlutil.release(conn);
                                return;
                            } else {
                                resultData.push(res.rows[0][0]);
                                conn.execute(declaration.serialNumber.selectOne, [resultData[0]], (err, res) => {
                                    if (err) {
                                        console.error(err.message);
                                        sqlutil.release(conn);
                                    } else {
                                        resultData.push(res.rows[0][0]);
                                        conn.execute(declaration.laboratory.selectOne, [resultData[0]], (err, res) => {
                                            if (err) {
                                                console.error(err.message);
                                                sqlutil.release(conn);
                                            } else {
                                                resultData.push(res.rows[0][0]);
                                                conn.execute(declaration.content.selectOne, [resultData[0]], (err, res) => {
                                                    if (err) {
                                                        console.error(err.message);
                                                        sqlutil.release(conn);
                                                    } else {
                                                        resultData.push(res.rows[0][0]);
                                                        console.log(table([headers, resultData]));
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
                conn.execute(simpleQueries.selectAll,
                    (err, res) => {
                        if (err) {
                            console.error(err.message);
                            sqlutil.release(conn);
                            return;
                        } else {
                            resultData.push(res.rows[0]);
                            conn.execute(declaration.serialNumber.selectAll, (err, res) => {
                                if (err) {
                                    console.error(err.message);
                                    sqlutil.release(conn);
                                } else {
                                    resultData.push(res.rows[0]);
                                    conn.execute(declaration.laboratory.selectAll, (err, res) => {
                                        if (err) {
                                            console.error(err.message);
                                            sqlutil.release(conn);
                                        } else {
                                            resultData.push(res.rows[0]);
                                            conn.execute(declaration.content.selectAll, (err, res) => {
                                                if (err) {
                                                    console.error(err.message);
                                                    sqlutil.release(conn);
                                                } else {
                                                    resultData.push(res.rows[0]);
                                                    console.log(table([headers, resultData]));
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
    },
    create: function (sifra, serijskiBroj, laboratorija, sadrzaj, datum) {
        var rl = readline.createInterface({
            input: process.stdin
        });

        console.log('Unesite sifra,serijskiBroj,laboratorija,sadrzaj,datum sa zarezima:\n');

        rl.on('line', (line) => {
            let params = line.split(',');

            oracledb.getConnection(dbconf, (err, conn) => {
                if (err) {
                    console.error(err.message);
                    return;
                } else {
                    conn.execute(simpleQueries.create, [+params[0], +params[1], params[2], params[3], params[4]],
                        (err, res) => {
                            if (err) {
                                console.error(err.message);
                                sqlutil.release(conn);
                                return;
                            } else {
                                console.log('Dodato u tabelu CarinskiDokument: ', id);
                                sqlutil.release(conn);
                                return;
                            }
                        });
                }
            });
        });
    },
    update: function (column, value, id) {
        var rl = readline.createInterface({
            input: process.stdin
        });

        console.log('Unesite column,value,id sa zarezima:\n');

        rl.on('line', (line) => {
            var params = line.split(',');
            oracledb.getConnection(dbconf, (err, conn) => {
                if (err) {
                    console.error(err.message);
                    return;
                } else {
                    conn.execute(simpleQueries.update, [params[0], +params[1], +params[2]],
                        (err, res) => {
                            if (err) {
                                console.error(err.message);
                                sqlutil.release(conn);
                                return;
                            } else {
                                console.log('Izmenjeno u tabeli CarinskiDokument: ', id);
                                sqlutil.release(conn);
                                return;
                            }
                        });
                }
            });
        });

    },
    deleteOne: function (id) {
        var rl = readline.createInterface({
            input: process.stdin
        });

        console.log('Unesite id:\n');

        rl.on('line', (line) => {
            let id = +line;
            oracledb.getConnection(dbconf, (err, conn) => {
                if (err) {
                    console.error(err.message);
                    return;
                } else {
                    conn.execute(simpleQueries.deleteOne, [id],
                        (err, res) => {
                            if (err) {
                                console.error(err.message);
                                sqlutil.release(conn);
                                return;
                            } else {
                                console.log('Ne postoji vise u tabeli CarinskiDokument: ', id);
                                sqlutil.release(conn);
                                return;
                            }
                        });
                }
            })
        });
    },
    deleteAll: function () {
        oracledb.getConnection(dbconf, (err, conn) => {
            if (err) {
                console.error(err.message);
                return;
            } else {
                conn.execute(simpleQueries.deleteAll, [id],
                    (err, res) => {
                        if (err) {
                            console.error(err.message);
                            sqlutil.release(conn);
                            return;
                        } else {
                            console.log('Sve obrisano!');
                            sqlutil.release(conn);
                            return;
                        }
                    });
            }
        })
    }
};

module.exports = statements;
