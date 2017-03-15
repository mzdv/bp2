var menu = require('appendable-cli-menu');

var query = require('../queries');

let menuTree = [
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
        name: 'Carinski dokument',
        submenu: function () {
            var appOptions = menu('Izaberite opciju', (option) => {
                option.performAction();
            });

            menuTree[3].operations.forEach((binding) => {
                appOptions.add(binding);
            });
        },
        operations: [
            {
                name: 'Kreiraj novi CarinskiDokument',
                performAction: query.structuredType.create,
            },
            {
                name: 'Izvuci sve CarinskeDokumente',
                performAction: query.structuredType.selectAll,
            },
            {
                name: 'Izvuci jedan CarinskiDokument',
                performAction: query.structuredType.selectOne,
            },
            {
                name: 'Obrisi sve CarinskiDokument',
                performAction: query.structuredType.deleteAll,
            },
            {
                name: 'Obrisi jedan CarinskiDokumenti',
                performAction: query.structuredType.deleteOne,
            },
            {
                name: 'Izvuci sve CarinskeDokumente',
                performAction: query.structuredType.selectAll,
            },
            {
                name: 'Izmeni CarinskiDokument',
                performAction: query.structuredType.update,
            }
        ]
    },
    {
        name: 'Izvedene vrednosti',
        activate: query.derivableValues
    },
    {
        name: 'Sanity check',
        activate: query.sanityCheck
    }
];

module.exports = menuTree;
