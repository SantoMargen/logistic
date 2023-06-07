const Auth = require("../db/models/auth")

const createAuth = async (req, res, next) => {
    try {
        const { msidsdn, username, name, password } = req.body
        const payload = {
            msidsdn,
            username,
            name,
            password
        }

        const newRecord = await Auth.cre(payload)
        return res.status(201).json(newRecord)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createAuth
}