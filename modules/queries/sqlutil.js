module.exports.release = function (connection) {
    connection.close(
        function (err) {
            if (err) {
                console.error(err.message);
            }
        });
};

module.exports.formatDataFromDb = function (header, rows) {
    var parsedHeader = header.map((data) => {
        return data.name;
    });
    var parsedRows = rows[0] || [null];

    return [parsedHeader, parsedRows];
}
