let menu = require('appendable-cli-menu');
let chalk = require('chalk');
let bindings = require('./modules/bindings');

console.log(chalk.cyan('--------------------------------'));
console.log(chalk.magenta('Aplikacija iz Baza podataka 2'));
console.log(chalk.magenta('Milos Zivadinovic 3028/16 2017'));
console.log(chalk.cyan('--------------------------------'));

let appOptions = menu('Izaberite opciju', (option) => {
    option.submenu();
});

bindings.forEach((binding) => {
    appOptions.add(binding);
});
