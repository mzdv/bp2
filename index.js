let chalk = require('chalk');

let bindings = require('./modules/bindings');
let branching = require('./modules/branching');

console.log(chalk.cyan('--------------------------------'));
console.log(chalk.magenta('Aplikacija iz Baza podataka 2'));
console.log(chalk.magenta('Milos Zivadinovic 3028/16 2017'));
console.log(chalk.cyan('--------------------------------'));

branching(bindings);
