const Logistic = require("../db/models/logistic")
const { Sequelize } = require("sequelize")
const Op = Sequelize.Op;

class LogisticContoller {
    static async createLogistic(req, res, next) {
        try {
            const { logistic_name, amount, destination_name, origin_name, duration } = req.body
            const payload = {
                logistic_name,
                amount,
                destination_name,
                origin_name,
                duration
            }
            const newRecord = await Logistic.create(payload)

            return res.status(201).json(newRecord)
        } catch (error) {
            next(error)
        }
    }

    static async searchLogistic(req, res, next) {
        try {
            const { origin_name, destination_name } = req.query
            const logistics = await Logistic.findAll({
                where: {
                    [Op.and]: [{ origin_name }, { destination_name }]
                }
            })

            if (!logistics | logistics.length < 1) throw { name: "NOTFOUND" }

            return res.status(200).json(logistics)
        } catch (error) {
            next(error)
        }
    }

}


module.exports = LogisticContoller