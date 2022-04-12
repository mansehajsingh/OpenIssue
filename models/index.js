/* require dependencies */
const User = require("./User");
const Project = require("./Project");
const ProjectMember = require("./ProjectMember");

/**
 * This file is used to define all relations between models
 * before exporting them to the controllers.
 */

/* relations */
User.hasMany(Project, { foreignKey: "owner" });

Project.belongsTo(User, { foreignKey: "owner" });


/* export all models */
module.exports = {
    User,
    Project,
    ProjectMember,
};