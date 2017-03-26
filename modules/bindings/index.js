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
        name: 'Ponude i stavke ponude',
        action: function() {
            branching([
            {
                name: 'Kreiraj novu ponudu',
                action: query.denormalization2NF.ponuda.create,
            },
            {
                name: 'Izmeni ponudu',
                action: query.denormalization2NF.ponuda.update
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
                name: 'Izmeni stavku ponude',
                action: query.denormalization2NF.stavkaPonude.update
            },
            {
                name: 'Izvuci sve stavke ponude',
                action: query.denormalization2NF.stavkaPonude.selectAll,
            },
            {
                name: 'Izvuci jednu stavku ponude',
                action: query.denormalization2NF.stavkaPonude.selectOne,
            },
            {
                name: 'Obrisi sve stavke ponude',
                action: query.denormalization2NF.stavkaPonude.deleteAll,
            },
            {
                name: 'Obrisi jednu stavku ponude',
                action: query.denormalization2NF.stavkaPonude.deleteOne,
            }
        ]) }
    },
    {
        name: 'Klijenti i racuni',
        action: branching([
            {
                name: 'Kreiraj novog klijenta',
                action: query.denormalization3NF.klijent.create,
            },
            {
                name: 'Izmeni klijenta',
                action: query.denormalization3NF.klijent.update
            },
            {
                name: 'Izvuci sve klijente',
                action: query.denormalization3NF.klijent.selectAll
            },
            {
                name: 'Izvuci sve racune koji pripadaju klijentu',
                action: query.denormalization3NF.klijent.selectAllRacuni
            },
            {
                name: 'Izvuci jednog klijenta',
                action: query.denormalization3NF.klijent.selectOne,
            },
            {
                name: 'Obrisi sve klijente',
                action: query.denormalization3NF.klijent.deleteAll,
            },
            {
                name: 'Obrisi jednog klijenta',
                action: query.denormalization3NF.klijent.deleteOne,
            },
            {
                name: 'Kreiraj novi racun',
                action: query.denormalization3NF.klijent.create,
            },
            {
                name: 'Izmeni klijenta na racunu',
                action: query.denormalization3NF.racun.update
            },
            {
                name: 'Izvuci sve racune',
                action: query.denormalization3NF.racun.selectAll
            },
            {
                name: 'Izvuci jedan racun',
                action: query.denormalization3NF.racun.selectOne,
            },
            {
                name: 'Obrisi sve racune',
                action: query.denormalization3NF.racun.deleteAll,
            },
            {
                name: 'Obrisi jedan racun',
                action: query.denormalization3NF.racun.deleteOne,
            }
        ]),
    },
    {
        name: 'Carinski dokument',
        action: branching([
            {
                name: 'Kreiraj novi carinski dokument',
                action: query.structuredType.create,
            },
            {
                name: 'Izmeni carinski dokument',
                action: query.structuredType.update
            },
            {
                name: 'Izvuci sve carinske dokumente',
                action: query.structuredType.selectAll,
            },
            {
                name: 'Izvuci jedan carinski dokument',
                action: query.structuredType.selectOne,
            },
            {
                name: 'Obrisi sve carinski dokument',
                action: query.structuredType.deleteAll,
            },
            {
                name: 'Obrisi jedan carinski dokument',
                action: query.structuredType.deleteOne,
            }
        ]),
    },
    {
        name: 'Zahtev za ponudu i stavka zahteva',
        action: branching([
            {
                name: 'Kreiraj novi zahtev za ponudu',
                action: query.derivableValues.zahtevZaPonudu.create,
            },
            {
                name: 'Izmeni zahtev za ponudu',
                action: query.derivableValues.zahtevZaPonudu.update
            },
            {
                name: 'Izvuci sve zahteve za ponudu',
                action: query.derivableValues.zahtevZaPonudu.selectAll,
            },
            {
                name: 'Izvuci jedan zahtev za ponudu',
                action: query.derivableValues.zahtevZaPonudu.selectOne,
            },
            {
                name: 'Izvuci sve stavke ponude koje pripadaju ponudi',
                action: query.derivableValues.zahtevZaPonudu.selectAllStavkaZahtevZaPonudu
            },
            {
                name: 'Obrisi sve zahteve za ponudu',
                action: query.derivableValues.zahtevZaPonudu.deleteAll,
            },
            {
                name: 'Obrisi jedan zahtev za ponudu',
                action: query.derivableValues.zahtevZaPonudu.deleteOne,
            },
            {
                name: 'Kreiraj novu stavku zahteva',
                action: query.derivableValues.stavkaZahteva.create,
            },
            {
                name: 'Izmeni stavku zahteva',
                action: query.derivableValues.stavkaZahteva.update
            },
            {
                name: 'Izvuci sve stavke zahteva',
                action: query.derivableValues.stavkaZahteva.selectAll,
            },
            {
                name: 'Izvuci jednu stavku zahteva',
                action: query.derivableValues.stavkaZahteva.selectOne,
            },
            {
                name: 'Izvuci sve zahteve koje pripadaju stavki zahteva',
                action: query.derivableValues.stavkaZahteva.selectAllZahtev
            },
            {
                name: 'Obrisi sve stavke zahteva',
                action: query.derivableValues.stavkaZahteva.deleteAll,
            },
            {
                name: 'Obrisi jednu stavku zahteva',
                action: query.derivableValues.stavkaZahteva.deleteOne,
            }
        ])
    },
    {
        name: 'Sanity check',
        action: branching([
            {
                name: 'Am I real?',
                action: query.sanityCheck.amIReal
            }
        ])
    }
];

module.exports = menuTree;
