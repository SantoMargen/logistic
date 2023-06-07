const TokenHelper = require("../helper/jwt")

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers ? req.headers['authorization'] : null;
        if (!token) throw { name: "UNAUTHORIZED" }

        const { id } = TokenHelper.verifyToken(token)
        if (!id) throw { name: "UNAUTHORIZED" }

        req.user = { id: id }

        next();
    } catch (error) {
        next(error);
    }
}


module.exports = authenticate