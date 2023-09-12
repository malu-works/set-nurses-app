const bcrypt = require('bcrypt');

const generateHash = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(8));
}
const validPassword = async (password, encrypted) => {
    return await bcrypt.compare(password, encrypted);
}

module.exports = {generateHash, validPassword}