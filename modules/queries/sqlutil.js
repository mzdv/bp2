module.exports.release = function (connection) {
    connection.close(
        function (err) {
            if (err) {
                console.error(err.message);
            }
        });
};
