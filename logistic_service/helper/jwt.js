const jwt = require('jsonwebtoken');

class TokenHelper {
    static verifyToken(accessToken) {
        return jwt.verify(accessToken, process.env.SECRET)
    }
}

module.exports = TokenHelper;