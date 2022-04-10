/* require dependencies */
const User = require("../models/User");
const userInvalidity = require("./validation/UserValidator");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const { validate: isValidUUID } = require("uuid");

/* controller */
class UserController {

    static async getUser(req, res, next) {
        // destructuring the request body
        const { user_id } = req.params;
        
        if (!user_id) return res.status(422).json({ message: "No user id provided." });
        if (!isValidUUID(user_id)) return res.status(422).json({ message: "User id format invalid." });

        const user = await User.findOne({ where: { id: user_id } });

        // if the user does not exist
        if (!user) return res.status(404).json({ message: "No user exists with this user id." });

        // formatting response
        const response = {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name
        }

        return res.status(200).json(response);
    }

    static async createUser(req, res, next) {
        // destructuring request body
        const { username, first_name, last_name, password } = req.body;

        // validating request items
        const userInvalid = userInvalidity(username, first_name, last_name, password);
        if (userInvalid) {
            return res.status(userInvalid.status).json(userInvalid.message);
        }

        // checking if the username exists already in the db
        const usernameExists = await User.usernameExists(username);
        if (usernameExists) {
            return res.status(409).json({ message: "This username has already been taken." });
        }
        
        // hashing the password to store in the db
        bcrypt.hash(password, parseInt(process.env.ROUNDS), async function(err, hashedPassword) {
            const user = await User.create({
                username: username,
                first_name: first_name,
                last_name: last_name,
                hashed_password: hashedPassword
            });
            return res.status(201).json({ 
                message: "User created successfully.",
                resource: {
                    id: user.id,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                }
            });
        });
    }

}

module.exports = UserController;