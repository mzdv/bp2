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
        action: branching([
            {
                name: 'Kreiraj novu ponudu',
                action: query.denormalization2NF.ponuda.create,
            },
            {
                name: 'Izvuci sve ponude',
                action: query.denormalization2NF.ponuda.selectAll,
            },
            {
                name: 'Izvuci sve stavke ponude koje pripadaju ponudi',
                action: query.denormalization2NF.ponuda.selectAllStavkaPonuda
            },
            {
                name: 'Izvuci jednu ponudu',
                action: query.denormalization2NF.ponuda.selectOne,
            },
            {
                name: 'Obrisi sve ponude',
                action: query.denormalization2NF.ponuda.deleteAll,
            },
            {
                name: 'Obrisi jednu ponudu',
                action: query.denormalization2NF.ponuda.deleteOne,
            },
            {
                name: 'Kreiraj novu stavku ponude',
                action: query.denormalization2NF.stavkaPonude.create,
            },
            {
                name: 'Izvuci sve stavke ponude',
                action: query.denormalization2NF.stavkaPonude.selectAll,
            },
            {
                name: 'Izvuci sve stavke ponude koje pripadaju ponudi',
                action: query.denormalization2NF.stavkaPonude.selectAllPonuda,
            },
            {
                name: 'Izvuci jednu stavku ponude',
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
        ])
    },
    {
        name: 'Denormalizacija 3NF',
        action: branching([]),
    },
    {
        name: 'CarinskiDokument',
        action: branching([
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
        ]),
    },
    {
        name: 'Izvedene vrednosti',
        action: branching([])
    },
    {
        name: 'Sanity check',
        action: branching([
            {
                name: 'Pokreni',
                action: query.sanityCheck.amIReal
            }
        ])
    }
];

module.exports = menuTree;
