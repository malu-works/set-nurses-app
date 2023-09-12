const jwt = require('jsonwebtoken');

const TOKEN_SECRET = "99e8d70811d1eae95dad461e131dbb0d8c31e0e5d66f1e56fdee0f41b61e0348197a4b083e28f6cfa33457db8075cd81956a924bd549ed20b41fe72c3fd4a8fe";

const generateAccessToken = (email) => {
    return jwt.sign(email, TOKEN_SECRET, { expiresIn: '1800s' });
}

const verifyToken = (token, callback) => {
    jwt.verify(token, TOKEN_SECRET, callback)
}

module.exports =  { generateAccessToken, verifyToken}