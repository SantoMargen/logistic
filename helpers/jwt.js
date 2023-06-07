const jwt = require('jsonwebtoken');

class TokenHelper {
    static verifyToken(accessToken) {
        return jwt.verify(accessToken, process.env.SECRET)
    }
    static generateToken(payload) {
        return jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1d'
        })
    }
}

module.exports = TokenHelper;