module.exports = function (server) {
    //login
    server.post('/api/login', function (req, res) {
        res.send({
            success: true,
            message: null,
            data: null
        });
    });
};