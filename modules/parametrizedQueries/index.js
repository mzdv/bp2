module.exports = {
    denormalization2NF: {
        ponuda: {
            selectAll: '',
            selectOne: '',
            selectAllStavkaPonuda: '',
            create: '',
            update: '',
            deleteOne: '',
            deleteAll: ''
        },
        stavkaPonude: {
            selectAll: '',
            selectOne: '',
            selectAllPonuda: '',
            create: '',
            update: '',
            deleteOne: '',
            deleteAll: ''
        }
    },
    denormalization3NF: {
        klijent: {
            selectAll: 'SELECT * FROM KLIJENT',
            selectOne: '',
            selectAllPonuda: '',
            create: '',
            update: '',
            deleteOne: '',
            deleteAll: ''
        },
        racun: {
            selectAll: 'SELECT * FROM RACUN',
            selectOne: '',
            selectAllPonuda: '',
            create: '',
            update: 'UPDATE RACUN SET :column = :value WHERE SIFRA=:id',
            deleteOne: '',
            deleteAll: ''
        },
        triggers: {
            blockTriggerCompilation: 'ALTER TRIGGER KLIJENT_BLOCK_BU COMPILE'
        }
    },

    structuredType: {
        selectOne: 'SELECT "Datum" FROM "CarinskiDokument" WHERE "Sifra"=:id',
        selectAll: 'SELECT "Datum" FROM "CarinskiDokument"',
        create: 'INSERT INTO "CarinskiDokument" VALUES (:sifra, "obj_deklaracija"(:serijskiBroj, :laboratorija, :sadrzaj), :datum)',
        update: 'UPDATE "CarinskiDokument" SET :column = :value WHERE "Sifra"=:id',
        deleteOne: 'DELETE FROM "CarinskiDokument" WHERE "Sifra"=:id',
        deleteAll: 'TRUNCATE TABLE "CarinskiDokument"',
        structuredType: {
            serialNumber: {
                selectAll: 'SELECT cd."Deklaracija".getSerijskiBroj() FROM "CarinskiDokument" cd',
                selectOne: 'SELECT cd."Deklaracija".getSerijskiBroj() FROM "CarinskiDokument" cd WHERE "Sifra"=:id'
            },
            laboratory: {
                selectAll: 'SELECT cd."Deklaracija".getLaboratorija() FROM "CarinskiDokument" cd',
                selectOne: 'SELECT cd."Deklaracija".getLaboratorija() FROM "CarinskiDokument" cd WHERE "Sifra"=:id'
            },
            content: {
                selectAll: 'SELECT cd."Deklaracija".getSadrzaj() FROM "CarinskiDokument" cd',
                selectOne: 'SELECT cd."Deklaracija".getSadrzaj() FROM "CarinskiDokument" cd WHERE "Sifra"=:id'
            }
        }
    },
    derivableValues: {
        selectAll: 'SELECT * FROM KLIJENT',
        selectOne: '',
        selectAllPonuda: '',
        create: '',
        update: '',
        deleteOne: '',
        deleteAll: ''
    },
    sanityCheck: {
        amIReal: 'SELECT "Sifra", "Ime" FROM "OdgovornoLice"'
    }
};
