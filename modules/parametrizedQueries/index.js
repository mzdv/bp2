module.exports = {
    denormalization2NF: {
        ponuda: {
            selectAll: '',
            selectOne: '',
            selectAllStavkaPonuda: '',
            create: '',
            deleteOne: '',
            deleteAll: ''
        },
        stavkaPonude: {
            selectAll: '',
            selectOne: '',
            selectAllPonuda: '',
            create: '',
            deleteOne: '',
            deleteAll: ''
        }
    },
    denormalization3NF: {
        klijent: {
            selectAll: 'SELECT * FROM KLIJENT',
        },
        racun: {
            selectAll: 'SELECT * FROM RACUN',
            update: 'UPDATE RACUN SET :column = :value WHERE SIFRA=:id'
        },
        service: {
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

    },
    sanityCheck: {
        amIReal: 'SELECT "Sifra", "Ime" FROM "OdgovornoLice"'
    }
};
