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
        activate: query.denormalization2NF
    },
    {
        name: 'Denormalizacija 3NF',
        activate: query.denormalization3NF
    },
    {
        name: 'Struktuirani tip',
        activate: query.structuredType
    },
    {
        name: 'Distinct tip',
        activate: query.distinctType
    },
    {
        name: 'Izvedene vrednosti',
        activate: query.derivableValues
    },
    {
        name: 'Vertikalno particionisanje',
        activate: query.verticalPartitioning
    },
    {
        name: 'Sanity check',
        activate: query.sanityCheck
    }
];
