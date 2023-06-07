const Logistic = require("../db/models/logistic")


class LogisticContoller {
    static async createLogistic(req, res, next) {
        try {
            console.log(req.body, "===============");
        } catch (error) {
            next(error)
        }
    }

}


module.exports = Logistic