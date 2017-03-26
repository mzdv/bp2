let menu = require('appendable-cli-menu');

module.exports = function (branch) {
    
    let appOptions = menu('Izaberite opciju', (option) => {
        // branch.stop();
        option.action();    // something is fucky around here
    });

    branch.forEach((binding) => {
        appOptions.add(binding);
    });
};
