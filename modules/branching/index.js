let menu = require('appendable-cli-menu');

module.exports = function (branch) {
    
    let appOptions = menu('Izaberite opciju', (option) => {
        option.action();    // something is fucky around here
    });

    branch.forEach((binding) => {
        appOptions.add(binding);
    });
};
