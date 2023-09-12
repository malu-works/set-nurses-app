
const isUUIDV4 = (data) => /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(data);
const isEmail = (data) => /\S+@\S+\.\S+/.test(data);
module.exports = { isUUIDV4, isEmail }