var query = require('../queries');

module.exports = [
    {
        name: 'Izlaz',
        activate: function () {
            console.log('Izlazim...');
            process.exit();
        }
    },
    {
        name: 'Denormalizacija 2NF',
        activate: function () { query.denormalization2NF(); }
    },
    {
        name: 'Denormalizacija 3NF',
        activate: function () { query.denormalization3NF(); }
    },
    {
        name: 'Struktuirani tip',
        activate: function () { query.structuredType(); }
    },
    {
        name: 'Distinct tip',
        activate: function () { query.distinctType(); }
    },
    {
        name: 'Izvedene vrednosti',
        activate: function () { query.derivableValues(); }
    },
    {
        name: 'Vertikalno particionisanje',
        activate: function () { query.verticalPartitioning(); }
    }
];
