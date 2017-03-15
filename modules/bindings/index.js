let query = require('../queries');
let branching = require('../branching');

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
        action: branching(menuTree[1].operations),
        operations: [
            {
                name: 'Kreiraj novu Ponuda',
                action: query.denormalization2NF.stavkaPonude.ponuda.create,
            },
            {
                name: 'Izvuci sve Ponuda',
                action: query.denormalization2NF.ponuda.selectAll,
            },
            {
                name: 'Izvuci sve StavkaPonude koje pripadaju Ponuda',
                action: query.denormalization2NF.ponuda.selectAllStavkaPonuda
            },
            {
                name: 'Izvuci jednu Ponuda',
                action: query.denormalization2NF.ponuda.selectOne,
            },
            {
                name: 'Obrisi sve Ponuda',
                action: query.denormalization2NF.ponuda.deleteAll,
            },
            {
                name: 'Obrisi jedan Ponuda',
                action: query.denormalization2NF.ponuda.deleteOne,
            },
            {
                name: 'Kreiraj novu Ponuda',
                action: query.denormalization2NF.ponuda.create,
            },
            {
                name: 'Izvuci sve StavkaPonude',
                action: query.denormalization2NF.stavkaPonude.selectAll,
            },
            {
                name: 'Izvuci sve StavkaPonude koje pripadaju Ponuda',
                action: query.denormalization2NF.stavkaPonude.selectAllPonuda,
            },
            {
                name: 'Izvuci jednu StavkaPonude',
                action: query.denormalization2NF.stavkaPonude.selectOne,
            },
            {
                name: 'Obrisi sve StavkaPonude',
                action: query.denormalization2NF.stavkaPonude.deleteAll,
            },
            {
                name: 'Obrisi jedan StavkaPonude',
                action: query.denormalization2NF.stavkaPonude.deleteOne,
            }
        ]
    },
    {
        name: 'Denormalizacija 3NF',
        action: branching(menuTree[2].operations),
        operations: [
        ]
    },
    {
        name: 'CarinskiDokument',
        action: branching(menuTree[3].operations),
        operations: [
            {
                name: 'Kreiraj novi CarinskiDokument',
                action: query.structuredType.create,
            },
            {
                name: 'Izvuci sve CarinskeDokumente',
                action: query.structuredType.selectAll,
            },
            {
                name: 'Izvuci jedan CarinskiDokument',
                action: query.structuredType.selectOne,
            },
            {
                name: 'Obrisi sve CarinskiDokument',
                action: query.structuredType.deleteAll,
            },
            {
                name: 'Obrisi jedan CarinskiDokument',
                action: query.structuredType.deleteOne,
            },
            {
                name: 'Izmeni CarinskiDokument',
                action: query.structuredType.update,
            }
        ]
    },
    {
        name: 'Izvedene vrednosti',
        action: branching(menuTree[4].operations),
        operations: [
        ]
    },
    {
        name: 'Sanity check',
        action: branching(menuTree[5].operations),
        operations: [
            {
                name: 'Pokreni',
                action: query.sanityCheck.amIReal
            }
        ]
    }
];

module.exports = menuTree;
