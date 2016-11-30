var restify = require('restify');
var colors = require('colors');
var partition = require('./partition/index');

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.requestLogger());
server.use(restify.bodyParser());
partition(server);
server.listen(8889, function () {
    console.log('');
    console.log('');
    console.log('Mock Server is Started at 8889!!!'.bold.red);
    console.log('');
    console.log('');
});