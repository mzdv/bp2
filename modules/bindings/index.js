let menu = require('appendable-cli-menu');

let query = require('../queries');

let menuTree = [
    {
        name: 'Izlaz',
        activate: function () {
            console.log('Izlazim...');
            process.exit();
        }
    },
    {
        name: 'Ponuda i StavkaPonude',
        submenu: function () {
            let appOptions = menu('Izaberite opciju', (option) => {
                option.performAction();
            });

            menuTree[1].operations.forEach((binding) => {
                appOptions.add(binding);
            });
        },
        operations: [
            {
                name: 'Kreiraj novu Ponuda',
                performAction: query.denormalization2NF.stavkaPonude.ponuda.create,
            },
            {
                name: 'Izvuci sve Ponuda',
                performAction: query.denormalization2NF.ponuda.selectAll,
            },
            {
                name: 'Izvuci sve StavkaPonude koje pripadaju Ponuda',
                performAction: query.denormalization2NF.ponuda.selectAllStavkaPonuda
            },
            {
                name: 'Izvuci jednu Ponuda',
                performAction: query.denormalization2NF.ponuda.selectOne,
            },
            {
                name: 'Obrisi sve Ponuda',
                performAction: query.denormalization2NF.ponuda.deleteAll,
            },
            {
                name: 'Obrisi jedan Ponuda',
                performAction: query.denormalization2NF.ponuda.deleteOne,
            },
            {
                name: 'Kreiraj novu Ponuda',
                performAction: query.denormalization2NF.ponuda.create,
            },
            {
                name: 'Izvuci sve StavkaPonude',
                performAction: query.denormalization2NF.stavkaPonude.selectAll,
            },
            {
                name: 'Izvuci sve StavkaPonude koje pripadaju Ponuda',
                performAction: query.denormalization2NF.stavkaPonude.selectAllPonuda,
            },
            {
                name: 'Izvuci jednu StavkaPonude',
                performAction: query.denormalization2NF.stavkaPonude.selectOne,
            },
            {
                name: 'Obrisi sve StavkaPonude',
                performAction: query.denormalization2NF.stavkaPonude.deleteAll,
            },
            {
                name: 'Obrisi jedan StavkaPonude',
                performAction: query.denormalization2NF.stavkaPonude.deleteOne,
            }
        ]
    },
    {
        name: 'Denormalizacija 3NF',
        activate: query.denormalization3NF
    },
    {
        name: 'CarinskiDokument',
        submenu: function () {
            let appOptions = menu('Izaberite opciju', (option) => {
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
                name: 'Obrisi jedan CarinskiDokument',
                performAction: query.structuredType.deleteOne,
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
        submenu: function () {
            let appOptions = menu('Izaberite opciju', (option) => {
                option.performAction();
            });

            menuTree[5].operations.forEach((binding) => {
                appOptions.add(binding);
            });
        },
        operations: [
            {
                name: 'Pokreni',
                performAction: query.sanityCheck.amIReal

            }
        ]
    }
];

module.exports = menuTree;
