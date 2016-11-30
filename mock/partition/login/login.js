var UUID = require('../util/UUID');
module.exports = function (server) {
    //login
    server.post('/api/login', function (req, res) {
        req.body['userId'] = UUID();
        res.send({
            success: true,
            message: null,
            data: req.body
        });
    });
};