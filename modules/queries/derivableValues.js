let readline = require('readline');

let dbconf = require('../dbconf');
let sqlutil = require('../sqlutil');
let parametrizedQueries = require('../parametrizedQueries');

let statements = {
    zahtevZaPonudu: {
        create: function () {

            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite sifra,naslov,datum sa zarezima:');

            rl.on('line', (line) => {
                let params = line.split(',');
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.derivableValues.zahtevZaPonudu.create,
                    [+params[0], params[1], Date(params[2])],
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

                if (params[0] === 'datum') {
                    params[1] = Date(params[1]);
                }

                sqlutil.transactions.perform(
                    parametrizedQueries.derivableValues.zahtevZaPonudu.update,
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
                parametrizedQueries.derivableValues.zahtevZaPonudu.selectAll,
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
                input: process.stdin
            });

            console.log('Unesite sifruZahtevaZaPonudu:');


            rl.on('line', (line) => {
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
                input: process.stdin
            });

            console.log('Unesite id:');


            rl.on('line', (line) => {
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
    racun: {
        create: function () {

            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite sifra,kolicina,sifrazahtevZaPonudu sa zarezima:');

            rl.on('line', (line) => {
                let params = line.split(',');
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.derivableValues.zahtevZaPonudu.create,
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
                    parametrizedQueries.derivableValues.racun.update,
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
                parametrizedQueries.derivableValues.zahtevZaPonudu.selectAll,
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
                input: process.stdin
            });

            console.log('Unesite id:');

            rl.on('line', (line) => {
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
    }
};

module.exports = statements;
