// require statements
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv"); // we use dotenv to access environment variables
const { rows } = require("pg/lib/defaults");
const { Project } = require("../models/project");
const { Issue } = require("../models/issue");
const { Account } = require("../models/account");
const { v4: uuidV4 } = require('uuid');
const res = require("express/lib/response");

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
    
    if ( !(session.sessionID === sessionData.session_id) ) {
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

    let foreignProjectsQuery = "SELECT * FROM projects WHERE (name = ($1) AND owner = ($2)) ";

    for(let i = 2; i < integrations.length; i += 2) {
        foreignProjectsQuery += `OR (name = (${i + 1}) AND owner = (${i + 2})) `;
    }

    foreignProjectsQuery += ";";

    let projectDetails = [];

    (await integrations).rows.forEach(integration => {
        projectDetails.push(integration.projectname);
        projectDetails.push(integration.owner);
    });

    const foreignProjects = client.query(
        foreignProjectsQuery,
        projectDetails
    );

    (await foreignProjects).rows.forEach( foreignProj => {
        result.push( new Project(foreignProj.name, foreignProj.description, foreignProj.owner) );
    });

    return result;

}

async function isProjectNameAvailable(project) {

    const res = await client.query("SELECT * FROM projects WHERE name = ($1) AND owner = ($2);", 
    [ project.projectName, project.projectOwner ]);

    if(res.rows.length > 0) {
        return false;
    }
    
    return true;

}

async function createProject(project) {

    client.query("INSERT INTO projects(name, description, owner) VALUES ($1, $2, $3);", 
    [ project.projectName, project.projectDescription, project.projectOwner ]);

}

async function canViewProject(session, project) {

    if(session.username === project.projectOwner) {
        return true;
    }

    const res = await client.query(
        "SELECT * FROM integrations WHERE username = ($1) AND projectname = ($2) AND owner = ($3);",
        [ session.username, project.projectName, project.projectOwner ]
    );

    if(res.rows.length > 0) {
        return true;
    }

    return false;

}

async function getProjectDetails(project) {

    const descRes = await client.query(
        "SELECT * FROM projects WHERE name = ($1) AND owner = ($2);",
        [ project.projectName, project.projectOwner ]
    );

    let description = descRes.rows[0].description;

    let issues = [];

    const issuesRes = await client.query(
        "SELECT * FROM issues WHERE project_name = ($1) AND owner = ($2);",
        [ project.projectName, project.projectOwner ]
    );

    issuesRes.rows.forEach( entry => {
        let issue = new Issue(
            entry.title,
            entry.description,
            entry.project_name,
            entry.creator,
            entry.owner,
            entry.date_created,
            entry.type,
            entry.issue_id,
            entry.priority
        );

        issues.push(issue);
    });

    let members = [];

    const membersRes = await client.query(
        "SELECT * FROM integrations WHERE projectname = ($1) AND owner = ($2);",
        [ project.projectName, project.projectOwner ]
    );

    members.push(new Account(project.projectOwner));

    membersRes.rows.forEach( entry => {
        let account = new Account(entry.username);
        members.push(account);
    });

    const result = {
        description: description,
        members: members,
        issues: issues
    }

    return result;

}

async function getUniqueIssueId(project) {

    let candidateID = null;

    let res = null;

    do {

        candidateID = uuidV4().substring(0, 8);

        res = await client.query(
            "SELECT * FROM issues WHERE project_name = ($1) AND owner = ($2);",
            [ project.projectName, project.projectOwner ]
        );

    } while(!isUniqueIssueID(candidateID, res.rows))

}

function isUniqueIssueID(candidateID, issues) {
    issues.forEach( issue => {
        if(candidateID === issue.issue_id) {
            return false;
        }
    });

    return true;
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
module.exports.canViewProject = canViewProject;
module.exports.getProjectDetails = getProjectDetails;
module.exports.getUniqueIssueId = getUniqueIssueId;