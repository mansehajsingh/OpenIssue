/* require dependencies */
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv").config();

/* middleware functions */

async function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: "No token was sent with the request." });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
        // if the jwt was invalid
        if (error) return res.status(403).json({ message: "The token is invalid." });
        
        const { user_id, session_id } = payload;

        if (!user_id || !session_id) return res.status(403).json({ message: "The token is invalid." });

        const user = await User.findOne({ 
            where: { id: user_id, session_id: session_id } 
        });

        // if no user exists w/ this session id
        if (!user) return res.status(403).json({message: "The token is invalid."});

        // makes the details accessible to the next function
        req.session = { user_id, session_id };

        next();
    });
}

module.exports.authenticateToken = authenticateToken;