const errorHandler = (err, req, res, next) => {
    console.log(err.name);
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message: err.errors[0].message });
            break;
        case "JsonWebTokenError":
        case "TokenExpiredError":
            res.status(401).json({ message: "Invalid Access Token" });
            break;
        case "UNAUTHORIZED":
            res.status(401).json({ message: "Unauthorized" });
            break;
        case "NOTFOUND":
            res.status(401).json({ message: "Logistics notfound" });
            break;
        default:
            res.status(500).json({ message: "internal server error" });
            break;
    }
};

module.exports = errorHandler;
