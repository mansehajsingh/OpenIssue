/* require dependencies */
const User = require("../models/User");
const userInvalidity = require("./validation/UserValidator");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");

/* controller */
class UserController {

    static async createUser(req, res, next) {
        // destructuring request body
        const { username, first_name, last_name, password } = req.body;

        // validating request items
        const userInvalid = userInvalidity(username, first_name, last_name, password);
        if (userInvalid) {
            res.status(userInvalid.status).json(userInvalid.message);
            return;
        }

        // checking if the username exists already in the db
        const usernameExists = await User.usernameExists(username);
        if (usernameExists) {
            res.status(409).json({ message: "This username has already been taken." });
            return;
        }
        
        // hasing the password to store in the db
        bcrypt.hash(password, parseInt(process.env.ROUNDS), async function(err, hashedPassword) {
            const user = await User.create({
                username: username,
                first_name: first_name,
                last_name: last_name,
                hashed_password: hashedPassword
            });
            res.status(201).json({ message: "User created successfully." });
        });
    }

}

module.exports = UserController;