let readline = require('readline');

let dbconf = require('../dbconf');
let sqlutil = require('../sqlutil');
let parametrizedQueries = require('../parametrizedQueries');

let statements = {
    zahtevZaPonudu: {
        create: function () {

            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });

            rl.question('Unesite sifra,naslov,datum sa zarezima:', (line) => {
                let params = line.split(',');
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.derivableValues.zahtevZaPonudu.create,
                    [+params[0], params[1], new Date(Date(params[2]))],
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
                        parametrizedQueries.derivableValues.zahtevZaPonudu.update.preColumn,
                        params[0],
                        parametrizedQueries.derivableValues.zahtevZaPonudu.update.postColumn),
                    [params[1], +params[2]],
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
                parametrizedQueries.derivableValues.zahtevZaPonudu.selectAll,
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

            rl.question('Unesite id:', (line) => {
                let id = +line;
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.derivableValues.zahtevZaPonudu.selectOne,
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
        zahtevZaPonuduZahtevi: function () {
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });

            rl.question('Unesite sifruZahtevaZaPonudu:', (line) => {
                let id = +line;
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.derivableValues.zahtevZaPonudu.zahtevZaPonuduZahtevi,
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
                parametrizedQueries.derivableValues.zahtevZaPonudu.deleteAll,
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
                    parametrizedQueries.derivableValues.zahtevZaPonudu.deleteOne,
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
    stavkaZahteva: {
        create: function () {
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });

            rl.question('Unesite sifra,kolicina,sifrazahtevZaPonudu sa zarezima:', (line) => {
                let params = line.split(',');
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.derivableValues.stavkaZahteva.create,
                    [+params[0], +params[1], +params[2]],
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
                        parametrizedQueries.derivableValues.stavkaZahteva.update.preColumn,
                        params[0],
                        parametrizedQueries.derivableValues.stavkaZahteva.update.postColumn),
                    [params[1], +params[2]],
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
                parametrizedQueries.derivableValues.stavkaZahteva.selectAll,
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

            rl.question('Unesite id:', (line) => {
                let id = +line;
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.derivableValues.stavkaZahteva.selectOne,
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
                parametrizedQueries.derivableValues.stavkaZahteva.deleteAll,
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
                    parametrizedQueries.derivableValues.stavkaZahteva.deleteOne,
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
