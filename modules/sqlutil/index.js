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
        perform: function (query, params, callback) {
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
                                    if (res.metaData.length > 1 && res.rows.length > 1) {
                                        callback(null, table(sqlutil.base.formatData(res.metaData, res.rows)));
                                    } else {
                                        callback(null, 'Tabela izmenjena');
                                    }
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
                                    if (res.metaData.length > 1 && res.rows.length > 1) {
                                        callback(null, table(sqlutil.base.formatData(res.metaData, res.rows)));
                                    } else {
                                        callback(null, 'Tabela izmenjena');
                                    }
                                }
                            });
                    }
                });
            }

        }
    }
}
