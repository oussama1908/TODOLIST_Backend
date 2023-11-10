const jwt = require("jsonwebtoken");

const authmiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(400).json({ msg: "You are not authorized" });
        } else {
            const verifyToken = await jwt.verify(token, process.env.JWT);
            if (!verifyToken) {
                res.status(400).json({ msg: 'You are not authorized' });
            } else {
                req.body.userId = verifyToken.id;
                next();
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = authmiddleware;
