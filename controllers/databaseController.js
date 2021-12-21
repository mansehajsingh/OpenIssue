// require statements
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv"); // we use dotenv to access environment variables

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

async function createUser(username, password) {
    bcrypt.hash(password, 11, (err, hash) => {
        client.query('INSERT INTO accounts(username, password) VALUES ($1, $2);', [username, hash]);
    });
}

async function sessionExists(session) {

    const res = await client.query('SELECT * FROM sessions WHERE username = $1', [session.username]);

    if(res.rows.length > 0) { // if the session data already exists
        return true; 
    }

    return false;

}

async function createSession(session) {

    let exists = await sessionExists(session);

    if(exists === false) { // create a new row of session data
        client.query( 'INSERT INTO sessions(username, session_id, expiry_date) VALUES ($1, $2, $3);', 
        [ session.username, session.sessionID, session.expiryDate.toISOString() ] );
    }
    else if (exists === true) { // edit existing session data
        client.query( 'UPDATE sessions SET session_id = ($1), expiry_date = ($2) WHERE username = ($3);',
        [ session.sessionID, session.expiryDate, session.username ]);
    }

}

module.exports.getPasswordHash = getPasswordHash;
module.exports.isUsernameTaken = isUsernameTaken;
module.exports.createUser = createUser;
module.exports.createSession = createSession;
module.exports.sessionExists = sessionExists;