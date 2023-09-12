require('./database');
const express = require('express');
const router = require('./routes/router');

const server = express();
server.use(express.json());
server.use(router)

server.listen(8080, () => {
    console.log("Server started in http://127.0.0.1:8080")
})