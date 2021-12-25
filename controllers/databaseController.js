// require statements
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv"); // we use dotenv to access environment variables
const { rows } = require("pg/lib/defaults");
const { Project } = require("../models/project");

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

async function validateSession(session) {

    const res = await client.query('SELECT * FROM sessions WHERE username = $1', [session.username]);

    if (res.rows.length === 0) {
        return false;
    }

    let sessionData = res.rows[0];
    
    if ( !(session.sessionID === sessionData['session_id']) ) {
        return false;
    }

    let currentDate = Date.now();

    if( currentDate > new Date(sessionData.expiry_date) ) {

        client.query('DELETE FROM sessions WHERE username = $1', [session.username]);

        return false;
    }

    return true;

}

async function getProjects(username) {

    let result = [];

    const res = client.query(
        "SELECT * FROM projects WHERE owner = ($1)",
        [ username ]
    );


    if( !((await res).rows.length === 0) ) {
    
        (await res).rows.forEach( obj => {
            result.push( new Project(obj.name, obj.description, obj.owner) );
        });

    }   
    
    const integrations = client.query(
        "SELECT * FROM integrations WHERE username = ($1)",
        [username]
    );

    if((await integrations).rows.length === 0) {
        return result;
    }

    let foreignProjectsQuery = "SELECT * FROM projects WHERE name = ($1) ";

    for(let i = 1; i < integrations.length; i++) {
        foreignProjectsQuery += `OR name = (${i + 1}) `;
    }

    foreignProjectsQuery += ";";

    let projectNames = [];

    (await integrations).rows.forEach(integration => {
        projectNames.push(integration.projectname);
    });

    const foreignProjects = client.query(
        foreignProjectsQuery,
        projectNames
    );

    (await foreignProjects).rows.forEach( foreignProj => {
        result.push( new Project(foreignProj.name, foreignProj.description, foreignProj.owner) );
    });

    return result;

}

async function isProjectNameAvailable(project) {

    const res = await client.query("SELECT * FROM projects WHERE name = ($1);", [ project.projectName ]);

    if(res.rows.length > 0) {
        return false;
    }
    
    return true;

}

async function createProject(project) {

    client.query("INSERT INTO projects(name, description, owner) VALUES ($1, $2, $3);", 
    [ project.projectName, project.projectDescription, project.projectOwner ]);

}

module.exports.getPasswordHash = getPasswordHash;
module.exports.isUsernameTaken = isUsernameTaken;
module.exports.createUser = createUser;
module.exports.createSession = createSession;
module.exports.sessionExists = sessionExists;
module.exports.validateSession = validateSession;
module.exports.getProjects = getProjects;
module.exports.isProjectNameAvailable = isProjectNameAvailable;
module.exports.createProject = createProject;