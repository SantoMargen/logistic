const Auth = require("../db/models/auth")
const PasswordHelper = require("../helpers/brcrypt")
const TokenHelper = require("../helpers/jwt")

class AuthController {
    static async createAuth(req, res, next) {
        try {
            const { msisdn, username, name, password } = req.body
            const payload = {
                msisdn,
                username,
                name,
                password: PasswordHelper.hashPassword(password)
            }

            const newRecord = await Auth.create(payload)
            return res.status(201).json(newRecord)
        } catch (error) {
            next(error)
        }
    }

    static async authLogin(req, res, next) {
        try {
            const { msisdn, password } = req.body

            if (!msisdn) throw { name: "MSISDN_REQUIRED" }
            if (!password) throw { name: "PASSWORD_REQUIRED" }

            const auth = await Auth.findOne({
                where: { msisdn }
            })

            if (!auth || !PasswordHelper.comparePassword(password, auth.password)) {
                throw { name: "AUTH_NOTFOUND" };
            }

            const token = TokenHelper.generateToken({ id: auth.id });

            return res.status(200).json({ acces_token: token })
        } catch (error) {
            next(error)
        }
    }

    static async validateToken(req, res, next) {
        try {
            const token = req.headers ? req.headers['authorization'] : null;
            if (!token) throw { name: "UNAUTHORIZED" }

            const { id } = TokenHelper.verifyToken(token)

            return res.status(200).json({ id })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController