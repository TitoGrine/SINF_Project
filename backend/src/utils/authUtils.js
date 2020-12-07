const jwt = require('jsonwebtoken');
const user = require("../models/user");

const verifySession = async (req) => {
    const decoded = jwt.verify(req.headers["SessionJWT"], "cabkij3412poljmdae2alfkem312klamde");

    const registered = await user.findOne({
        where: {
            email: decoded.email,
        }
    });

    return registered !== null;
}

module.exports = verifySession