const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
var appRoutes = require('./route');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
mongoose.connect(
    "mongodb+srv://kokora:kokora123456789@cluster0.xxdch.mongodb.net/bakoback?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb database connection successfully");
});
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.use(function(req, res, next) {
    next();
});
// app.use('/', function (req, res, next) {
//     console.log("index");
//     res.json("bakobackend");
// });
app.use('/api', appRoutes);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log("Server is running on " + bind)
}