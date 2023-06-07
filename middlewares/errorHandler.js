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
        case "MSISDN_REQUIRED":
            res.status(400).json({ message: "Msisdn is required" });
            break;
        case "PASSWORD_REQUIRED":
            res.status(400).json({ message: "Password is required" });
            break;
        case "AUTH_NOTFOUND":
            res.status(404).json({ message: "Auth notfound" });
            break;
        case "UNAUTHORIZED":
            res.status(401).json({ message: "Unauthorized" });
            break;
        default:
            res.status(500).json({ message: "internal server error" });
            break;
    }
};

module.exports = errorHandler;
