let oracledb = require('oracledb');
let dbconf = require('../dbconf');
let table = require('table');

module.exports = {
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
            let parsedHeader = header.map((data) => {
                return data.name;
            });
            let parsedRows = rows[0] || [null];

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
                                    callback(err.message, null);
                                } else {
                                    sqlutil.base.releaseConnection(conn);
                                    callback(null, 'Tabela modifikovana');
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
                                    callback(err.message, null);
                                } else {
                                    sqlutil.base.releaseConnection(conn);
                                    callback(null, 'Tabela modifikovana');
                                }
                            });
                    }
                });
            }

        },
        readTable: function(query, callback) {
            oracledb.getConnection(dbconf, (err, conn) => {
                    if (err) {
                        callback(err.message);
                    } else {
                        conn.execute(query,
                            (err, res) => {
                                if (err) {
                                    sqlutil.base.releaseConnection(conn);
                                    callback(err.message, null);
                                } else {
                                    sqlutil.base.releaseConnection(conn);
                                    callback(null, table(sqlutil.base.formatData(res.metaData, res.rows)));
                                }
                            });
                    }
                });
        } 
    }
}
