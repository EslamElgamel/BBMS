const jwt = require('jsonwebtoken');

function generateJWT(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Adjust expiry time as needed
}

module.exports = generateJWT;