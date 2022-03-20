/* require dependencies */
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

/* controller */
class TokenController {

    static async generateToken(req, res, next) {
        const { username, password } = req.body;
        // finding user in db
        const user = await User.findOne({ where: { username: username } });

        // if user does not exist
        if (!user) {
            res.status(401).json({ message: "Username or password is invalid." });
            return;
        }
        
        // comparing password to hash in db
        const passwordIsValid = await bcrypt.compare(password, user.hashed_password);
        if(!passwordIsValid) {
            res.status(401).json({ message: "Username or password is invalid." });
            return;
        }

        // adding session id to record
        const sessionID = uuidv4();
        await User.update({ session_id: sessionID }, {
            where: { username: user.username }
        });
        
        // generating access token
        const payload = { username: username, session_id: sessionID }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "14d"
        });

        res.status(201).json({ token: accessToken});
    }
    
}

module.exports = TokenController;