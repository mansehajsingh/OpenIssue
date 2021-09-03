const { Client } = require("pg");

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

module.exports.getPasswordHash = getPasswordHash;