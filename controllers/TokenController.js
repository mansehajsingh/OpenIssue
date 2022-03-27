/* require dependencies */
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const appconfig = require("../config/appconfig");

/* controller */
class TokenController {

    static async generateToken(req, res, next) {
        const { username, password } = req.body;
        // finding user in db
        const user = await User.findOne({ where: { username: username } });

        // if user does not exist
        if (!user) {
            return res.status(401).json({ message: "Username or password is invalid." });
        }
        
        // comparing password to hash in db
        const passwordIsValid = await bcrypt.compare(password, user.hashed_password);
        if(!passwordIsValid) {
            return res.status(401).json({ message: "Username or password is invalid." });
        }

        // adding session id to record
        const sessionID = uuidv4();
        await User.update({ session_id: sessionID }, {
            where: { username: user.username }
        });
        
        // generating access token
        const payload = { user_id: user.id, session_id: sessionID }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "14d"
        });

        return res.cookie("token", accessToken, {
            maxAge: 12096e5, // 14 days
            httpOnly: true,
            secure: appconfig.development.useHttps,
            sameSite: true,
        }).sendStatus(201);
    }

    static async invalidateToken(req, res, next) {
        const { user_id, session_id } = req.session;

        // setting session id to null in the db
        await User.update({ session_id: null }, {
            where: { id: user_id, session_id: session_id }
        });

        return res.status(200).json({ message: "Token invalidated successfully." });
    }
    
}

module.exports = TokenController;