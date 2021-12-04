// require statements
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config(); // we use dotenv to access environment variables

dotenv.config();

const client = new Client({
    user: process.env.OPEN_ISSUE_USER,
    password: process.env.OPEN_ISSUE_PASS,
    host: process.env.OPEN_ISSUE_HOST,
    port: 5432,
    database: process.env.OPEN_ISSUE_DB,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

async function getPasswordHash(username) {

    const res = await client.query('SELECT * FROM accounts WHERE username = $1;', [username]);
    return res.rows[0]['password'];

}

async function isUsernameTaken(username) {

    const res = await client.query('SELECT * FROM accounts WHERE username = $1;', [username]);
    return res.rows.length;

}

function createUser(username, password) {
    bcrypt.hash(password, 11, (err, hash) => {
        client.query('INSERT INTO accounts(username, password) VALUES ($1, $2);', [username, hash]);
    });
}

module.exports.getPasswordHash = getPasswordHash;
module.exports.isUsernameTaken = isUsernameTaken;
module.exports.createUser = createUser;