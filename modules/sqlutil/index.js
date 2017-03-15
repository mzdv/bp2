var oracledb = require('oracledb');
var dbconf = require('../dbconf');

let sqlutil = {
    base: {
        releaseConnection: function (connection) {
            connection.close(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                });
        },
        formatDataFromDb: function (header, rows) {
            var parsedHeader = header.map((data) => {
                return data.name;
            });
            var parsedRows = rows[0] || [null];

            return [parsedHeader, parsedRows];
        }
    },
    transactions: {
        modifyTable: function (query, params, callback) {
            if (typeof params === object) {
                oracledb.getConnection(dbconf, (err, conn) => {
                    if (err) {
                        callback(err.message);
                    } else {
                        conn.execute(query, params,
                            (err, res) => {
                                if (err) {
                                    sqlutil.base.releaseConnection(conn);
                                    callback(err.message);
                                } else {
                                    sqlutil.base.releaseConnection(conn);
                                    callback('Tabela modifikovana');
                                }
                            });
                    }
                });
            } else {
                oracledb.getConnection(dbconf, (err, conn) => {
                    if (err) {
                        callback(err.message);
                    } else {
                        conn.execute(query,
                            (err, res) => {
                                if (err) {
                                    sqlutil.base.releaseConnection(conn);
                                    callback(err.message);
                                } else {
                                    sqlutil.base.releaseConnection(conn);
                                    callback('Tabela modifikovana');
                                }
                            });
                    }
                });
            }

        }
    }
}
