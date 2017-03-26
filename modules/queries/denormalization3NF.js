let readline = require('readline');

let dbconf = require('../dbconf');
let sqlutil = require('../sqlutil');
let parametrizedQueries = require('../parametrizedQueries');

let rearmTriggers = function (trigger) {
    sqlutil.transactions.perform(
        trigger,
        (err, res) => {
            if (err) {
                console.error(err);
            } else {
                console.log(res);
            }
        });
};

let statements = {
    klijent: {
        create: function () {
            rearmTriggers(parametrizedQueries.denormalization3NF.triggers.blockTriggerCompilation);

            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite sifra,ime,adresa,status sa zarezima:');

            rl.on('line', (line) => {
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
        },
        update: function () {
            rearmTriggers(parametrizedQueries.denormalization3NF.triggers.blockTriggerCompilation);

            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite column,value,id sa zarezima:');

            rl.on('line', (line) => {
                let params = line.split(',');
                rl.close();

                if (params[0] === 'datum') {
                    params[1] = Date(params[1]);
                }

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization3NF.klijent.update,
                    [params[0], params[1], +params[2]],
                    (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(res);
                        }
                    });
            });
        },
        selectAll: function () {
            sqlutil.transactions.perform(
                parametrizedQueries.denormalization3NF.klijent.selectAll,
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
                input: process.stdin
            });

            console.log('Unesite id:');


            rl.on('line', (line) => {
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
        selectAllPonuda: function () {
            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite sifraKlijenta:');


            rl.on('line', (line) => {
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
                input: process.stdin
            });

            console.log('Unesite id:');


            rl.on('line', (line) => {
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
            rearmTriggers(parametrizedQueries.denormalization3NF.triggers.blockTriggerCompilation);

            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite sifra,ime,tekst,datuimzdavanja,sifraklijenta sa zarezima:');

            rl.on('line', (line) => {
                let params = line.split(',');
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization3NF.klijent.create,
                    [+params[0], params[1], params[2], Date(params[3]), +params[3]],
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
            rearmTriggers(parametrizedQueries.denormalization3NF.triggers.blockTriggerCompilation);

            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite column,value,id sa zarezima:');

            rl.on('line', (line) => {
                let params = line.split(',');
                rl.close();

                if (params[0] === 'datum') {
                    params[1] = Date(params[1]);
                }

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization3NF.racun.update,
                    [params[0], params[1], +params[2]],
                    (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(res);
                        }
                    });
            });
        },
        selectAll: function () {
            sqlutil.transactions.perform(
                parametrizedQueries.denormalization3NF.klijent.selectAll,
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
                input: process.stdin
            });

            console.log('Unesite id:');


            rl.on('line', (line) => {
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
                input: process.stdin
            });

            console.log('Unesite id:');


            rl.on('line', (line) => {
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
    }
};

module.exports = statements;
