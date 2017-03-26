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
    ponuda: {
        create: function () {
            rearmTriggers(parametrizedQueries.denormalization2NF.triggers.afterUpdateTriggerCompilation);

            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite sifra,naslov,datum sa zarezima:');

            rl.on('line', (line) => {
                let params = line.split(',');
                rl.close();

                /*
                *   I'd like to see this refactored with a wrapper
                *   method that would take care of the boilerplate
                *   and also use the destructuring operator for more
                *   readable code. The example is above in the rearmTriggers
                *   function which does that, but without parameters.
                */

                /*
                *   Addendum: because of the way Node.js handles callbacks
                *   the code wouldn't benefit from an additional layer of
                *   abstraction because the callback logic would still have
                *   to be implemented.
                *   The destructuring part makes sense and would prove to be
                *   beneficial to the code readability, as well as improved
                *   facilities for determining and casting of the values to the
                *   required database type.
                */

                /*
                *   Furthermore, the facilities used to provide the arguments
                *   to the database layer need to be abstracted, so that the
                *   argument gathering logic (if it exists) isn't placed in the
                *   database abstraction layer (the name for this pseudo ORM
                *   since I cannot think of anything more creative).
                *
                *   My first idea of the improvement would be to pass a function
                *   which handles argument collection to the DAL which would
                *   be run to get the arguments. Arguments would be provided by
                *   passing an anonymous function which would either return
                *   fixed values or run an util function to perform collection 
                *   of arguments
                */

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization2NF.ponuda.create,
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
            rearmTriggers(parametrizedQueries.denormalization2NF.triggers.afterUpdateTriggerCompilation);

            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite column,value,id sa zarezima:');

            rl.on('line', (line) => {
                let params = line.split(',');
                rl.close();

                /*
                *   Might be some issues concerning the parsing of the argument
                *   determined by the column data type. The database will return
                *   an error if things go wrong, so that is an effective
                *   solution for the time being
                */

                if (params[0] === 'datum') {
                    params[1] = Date(params[1]);
                }

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization2NF.ponuda.update,
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
                parametrizedQueries.denormalization2NF.ponuda.selectAll,
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
                    parametrizedQueries.denormalization2NF.ponuda.selectOne,
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
        selectAllStavkaPonuda: function () {
            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite sifraPonude:');


            rl.on('line', (line) => {
                let id = +line;
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization2NF.ponuda.selectAllStavkaPonuda,
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
                parametrizedQueries.denormalization2NF.ponuda.deleteAll,
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
                    parametrizedQueries.denormalization2NF.ponuda.deleteOne,
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
    stavkaPonude: {
        create: function () {
            rearmTriggers(parametrizedQueries.denormalization3NF.triggers.afterUpdateTriggerCompilation);

            let rl = readline.createInterface({
                input: process.stdin
            });

            console.log('Unesite sifra,opis,sifrausluge,naslov sa zarezima:');

            rl.on('line', (line) => {
                let params = line.split(',');
                rl.close();

                sqlutil.transactions.perform(
                    parametrizedQueries.denormalization3NF.ponuda.create,
                    [+params[0], params[1], +params[2], params[3]],
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
            rearmTriggers(parametrizedQueries.denormalization3NF.triggers.afterUpdateTriggerCompilation);

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
                    parametrizedQueries.denormalization2NF.stavkaPonude.update,
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
                parametrizedQueries.denormalization3NF.ponuda.selectAll,
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
                    parametrizedQueries.denormalization3NF.ponuda.selectOne,
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
                parametrizedQueries.denormalization3NF.ponuda.deleteAll,
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
                    parametrizedQueries.denormalization3NF.ponuda.deleteOne,
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
