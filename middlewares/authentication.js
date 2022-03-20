/* require dependencies */
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv").config();

/* middleware functions */

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token was sent with the request." });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
        if (error) return res.status(403).json({ message: "The token is invalid." });

        const { username, session_id } = payload;

        const user = await User.findOne({ 
            where: { username: username, session_id: session_id } 
        });

        if (!user) return res.status(403).json({message: "The token is invalid."});

        next();
    });
}

module.exports.authenticateToken = authenticateToken;