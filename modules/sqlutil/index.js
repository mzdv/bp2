let oracledb = require('oracledb');
let dbconf = require('../dbconf');
let { table } = require('table');

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
            let parsedData = [];

            parsedData.push(header.map((data) => {
                return data.name;
            }));

            rows.forEach(row => {
                parsedData.push(row);
            });

            return parsedData;
        },
        queryBuilder: function (firstPart, column, secondPart) {
            return firstPart + column + secondPart;
        }
    }
}

let transactions = {
    perform: function (query, params, callback) {
        if (query.indexOf('DELETE') > -1 && typeof params === 'function') {
            callback = params;
            oracledb.getConnection(dbconf, (err, conn) => {
                if (err) {
                    callback(err.message);
                } else {
                    conn.execute(query, [], { autoCommit: true },
                        (err, res) => {
                            if (err) {
                                console.log(err);
                                sqlutil.base.releaseConnection(conn);
                                callback(err.message, null);
                            } else {
                                sqlutil.base.releaseConnection(conn);

                                if (res.metaData && res.rows) {
                                    if (res.metaData.length > 0 && res.rows.length > 0) {
                                        callback(null, table(sqlutil.base.formatDataFromDb(res.metaData, res.rows)));
                                    } else {
                                        callback(null, 'No data.');
                                    }
                                } else {
                                    callback(null, 'Table modified.');
                                }
                            }
                        });
                }
            });
        }
        else if (params) {
            oracledb.getConnection(dbconf, (err, conn) => {
                if (err) {
                    callback(err.message);
                } else {
                    conn.execute(query, params, { autoCommit: true },
                        (err, res) => {
                            if (err) {
                                sqlutil.base.releaseConnection(conn);
                                callback(err.message, null);
                            } else {
                                sqlutil.base.releaseConnection(conn);

                                if (res.metaData && res.rows) {
                                    if (res.metaData.length > 0 && res.rows.length > 0) {
                                        callback(null, table(sqlutil.base.formatDataFromDb(res.metaData, res.rows)));
                                    } else {
                                        callback(null, 'No data.');
                                    }
                                } else {
                                    callback(null, 'Table modified.');
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

                                if (res.metaData && res.rows) {
                                    if (res.metaData.length > 0 && res.rows.length > 0) {
                                        callback(null, table(sqlutil.base.formatDataFromDb(res.metaData, res.rows)));
                                    } else {
                                        callback(null, 'No data to show.');
                                    }
                                } else {
                                    callback(null, 'Table modified.');
                                }

                            }
                        });
                }
            });
        }

    }
}

sqlutil.transactions = transactions;

module.exports = sqlutil;
