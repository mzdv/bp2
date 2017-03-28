module.exports = {
    denormalization2NF: {
        ponuda: {
            selectAll: 'SELECT * FROM PONUDA',
            selectOne: 'SELECT * FROM PONUDA WHERE SIFRA= :id',
            selectAllStavkaPonuda: 'SELECT * FROM STAVKAPONUDE WHERE SIFRAUSLUGE=:id',
            create: 'INSERT INTO PONUDA VALUES(:sifra, :naslov, :datum)',
            update: {
                preColumn: 'UPDATE PONUDA SET ',
                postColumn: '=:value WHERE SIFRA=:id'
            },
            deleteOne: 'DELETE FROM PONUDA WHERE SIFRA=:id',
            deleteAll: 'DELETE PONUDA'
        },
        stavkaPonude: {
            selectAll: 'SELECT * FROM STAVKAPONUDE',
            selectOne: 'SELECT * FROM STAVKAPONUDE WHERE SIFRA= :id',
            create: 'INSERT INTO STAVKAPONUDE VALUES(:sifra, :opis, :sifrausluge, :naslov)',
            update: {
                preColumn: 'UPDATE STAVKAPONUDE SET ',
                postColumn: '=:value WHERE SIFRA=:id'
            },
            deleteOne: 'DELETE FROM STAVKAPONUDE WHERE SIFRA= :id',
            deleteAll: 'DELETE STAVKAPONUDE'
        },
        triggers: {
            afterUpdateTriggerCompilation: 'ALTER TRIGGER PONUDA_AU COMPILE'
        }
    },
    denormalization3NF: {
        klijent: {
            selectAll: 'SELECT * FROM KLIJENT',
            selectOne: 'SELECT * FROM KLIJENT WHERE SIFRA= :id',
            selectAllPonuda: 'SELECT * FROM RACUN WHERE SIFRAKLIJENTA= :id',
            create: 'INSERT INTO KLIJENT VALUES(:sifra, :ime, :adresa, :status)',
            update: {
                preColumn: 'UPDATE KLIJENT SET ',
                postColumn: '=:value WHERE SIFRA=:id'
            },
            deleteOne: 'DELETE FROM KLIJENT WHERE SIFRA= :id',
            deleteAll: 'DELETE KLIJENT'
        },
        racun: {
            selectAll: 'SELECT * FROM RACUN',
            selectOne: 'SELECT * FROM RACUN WHERE SIFRA= :id',
            create: 'INSERT INTO RACUN VALUES(:sifra, :ime, :tekst, :datumizdavanja, :sifraklijenta)',
            update: {
                preColumn: 'UPDATE RACUN SET ',
                postColumn: '=:value WHERE SIFRA=:id'
            },
            deleteOne: 'DELETE FROM RACUN WHERE SIFRA= :id',
            deleteAll: 'DELETE RACUN'
        },
        triggers: {
            blockTriggerCompilation: 'ALTER TRIGGER KLIJENT_BLOCK_BU COMPILE'
        }
    },

    structuredType: {
        selectAll: 'SELECT "Sifra", "Datum" FROM "CarinskiDokument"',
        selectOne: 'SELECT "Sifra", "Datum" FROM "CarinskiDokument" WHERE "Sifra"= :id',
        create: 'INSERT INTO "CarinskiDokument" VALUES (:sifra, "obj_deklaracija"(:serijskiBroj, :laboratorija, :sadrzaj), :datum)',
        update: {
            preColumn: 'UPDATE "CarinskiDokument" SET ',
            postColumn: '=:value WHERE "Sifra"=:id'
        },
        deleteOne: 'DELETE FROM "CarinskiDokument" WHERE "Sifra"=:id',
        deleteAll: 'DELETE "CarinskiDokument"',
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
    },
    derivableValues: {
        zahtevZaPonudu: {
            selectAll: 'SELECT * FROM ZAHTEVZAPONUDU',
            selectOne: 'SELECT * FROM ZAHTEVZAPONUDU WHERE SIFRA= :id',
            zahtevZaPonuduZahtevi: 'SELECT * FROM STAVKAZAHTEVA WHERE SIFRAZAHTEVAZAPONUDU= :id',
            create: 'INSERT INTO ZAHTEVZAPONUDU VALUES(:sifra, :naslov, :datum, null)',
            update: 'UPDATE ZAHTEVZAPONUDU SET :column = :value WHERE SIFRA= :id',
            update: {
                preColumn: 'UPDATE ZAHTEVZAPONUDU SET ',
                postColumn: '=:value WHERE SIFRA=:id'
            },
            deleteOne: 'DELETE FROM ZAHTEVZAPONUDU WHERE SIFRA= :id',
            deleteAll: 'DELETE ZAHTEVZAPONUDU'
        },
        stavkaZahteva: {
            selectAll: 'SELECT * FROM STAVKAZAHTEVA',
            selectOne: 'SELECT * FROM STAVKAZAHTEVA WHERE SIFRA= :id',
            create: 'INSERT INTO STAVKAZAHTEVA VALUES(:sifra, :kolicin, :sifrauzahtevazaponudu)',
            update: {
                preColumn: 'UPDATE STAVKAZAHTEVA SET ',
                postColumn: '=:value WHERE SIFRA=:id'
            },
            deleteOne: 'DELETE FROM STAVKAZAHTEVA WHERE SIFRA= :id',
            deleteAll: 'DELETE STAVKAZAHTEVA'
        }
    },
    sanityCheck: {
        amIReal: 'SELECT "Sifra", "Ime" FROM "OdgovornoLice"'
    }
};
