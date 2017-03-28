let readline = require('readline');

let dbconf = require('../dbconf');
let sqlutil = require('../sqlutil');
let parametrizedQueries = require('../parametrizedQueries');

let rearmTriggers = function (trigger, callback) {
    sqlutil.transactions.perform(
        trigger,
        null,
        (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, res);
            }
        });
};

let statements = {
    klijent: {
        create: function () {
            rearmTriggers(parametrizedQueries.denormalization3NF.triggers.blockTriggerCompilation, (err, res) => {
                let rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false
                });

                rl.question('Unesite sifra,ime,adresa,status sa zarezima: ', (line) => {
                    let params = line.split(',');
                    rl.close();

                    sqlutil.transactions.perform(
                        parametrizedQueries.denormalization3NF.klijent.create,
                        [+params[0], params[1], params[2], params[3]],
                        (err, res) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(res);
                            }
                        });
                });
            });
        },
        update: function () {
            rearmTriggers(parametrizedQueries.denormalization3NF.triggers.blockTriggerCompilation, (err, res) => {
                let rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false
                });

                rl.question('Unesite column,value,id sa zarezima: ', (line) => {
                    let params = line.split(',');
                    rl.close();

                    sqlutil.transactions.perform(
                        sqlutil.base.queryBuilder(
                            parametrizedQueries.denormalization3NF.klijent.update.preColumn,
                            params[0],
                            parametrizedQueries.denormalization3NF.klijent.update.postColumn
                        ),
                        [params[1], +params[2]],
                        (err, res) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(res);
                            }
                        });
                });
            });
        },
        selectAll: function () {
            sqlutil.transactions.perform(
                parametrizedQueries.denormalization3NF.klijent.selectAll,
                null,
                (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(res);
                    }
                });
        },
        selectOne: function () {
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });

            rl.question('Unesite id: ', (line) => {
                let id = +line;
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization3NF.klijent.selectOne,
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
        selectAllRacuni: function () {
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });

            rl.question('Unesite sifraKlijenta: ', (line) => {
                let id = +line;
                rl.close();
                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization3NF.klijent.selectAllPonuda,
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
                parametrizedQueries.denormalization3NF.klijent.deleteAll,
                (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(res);
                    }
                });
        },
        deleteOne: function () {
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });

            rl.question('Unesite id: ', (line) => {
                let id = +line;
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization3NF.klijent.deleteOne,
                    [id],
                    (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(res);
                        }
                    });
            });
        }
    },
    racun: {
        create: function () {
            rearmTriggers(parametrizedQueries.denormalization3NF.triggers.blockTriggerCompilation, (err, res) => {
                let rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false
                });

                rl.question('Unesite sifra,ime,tekst,datuimzdavanja,sifraklijenta sa zarezima: ', (line) => {
                    let params = line.split(',');
                    rl.close();

                    sqlutil.transactions.perform(
                        parametrizedQueries.denormalization3NF.racun.create,
                        [+params[0], params[1], params[2], new Date(Date(params[3])), +params[3]],
                        (err, res) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(res);
                            }
                        });
                });
            });
        },
        update: function () {
            rearmTriggers(parametrizedQueries.denormalization3NF.triggers.blockTriggerCompilation, (err, res) => {
                let rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false
                });

                rl.question('Unesite column,value,id sa zarezima:', (line) => {
                    let params = line.split(',');
                    rl.close();

                    if (params[0] === 'datum') {
                        params[1] = new Date(Date(params[1]));
                    }

                    sqlutil.transactions.perform(
                        sqlutil.base.queryBuilder(
                            parametrizedQueries.denormalization3NF.racun.update.preColumn,
                            params[0],
                            parametrizedQueries.denormalization3NF.racun.update.postColumn
                        ),
                        [params[1], +params[2]],
                        (err, res) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(res);
                            }
                        });
                });
            });
        },
        selectAll: function () {
            sqlutil.transactions.perform(
                parametrizedQueries.denormalization3NF.racun.selectAll,
                null,
                (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(res);
                    }
                });
        },
        selectOne: function () {
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });

            rl.question('Unesite id: ', (line) => {
                let id = +line;
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization3NF.racun.selectOne,
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
                parametrizedQueries.denormalization3NF.racun.deleteAll,
                (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(res);
                    }
                });
        },
        deleteOne: function () {
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });

            rl.question('Unesite id:', (line) => {
                let id = +line;
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization3NF.racun.deleteOne,
                    [id],
                    (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(res);
                        }
                    });
            });
        }
    }
};

module.exports = statements;
