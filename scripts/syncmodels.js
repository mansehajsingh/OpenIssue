/*
    Running "node syncmodels.js" will synchronize sequelize models in the database.
*/

/* require models */
const User = require("../models/User");
const Project = require("../models/Project");

alter = { alter: true }

function logSuccess(modelName) { 
    console.log(`${modelName} model was created/altered successfully.`);
}

function logFailure(modelName, err) {
    console.log(`Something went wrong when creating/altering the ${modelName} model. Error: `, err);
}

/* sync statements */
User.sync(alter).then(logSuccess("User")).catch((err) => logFailure("User", err));
Project.sync(alter).then(logSuccess("Project")).catch((err) => logFailure("Project", err));