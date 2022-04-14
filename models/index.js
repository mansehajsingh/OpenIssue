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
User.hasMany(ProjectMember, { foreignKey: "user_id" });

Project.belongsTo(User, { foreignKey: "owner" });
Project.hasMany(ProjectMember, { foreignKey: "project_id" });

ProjectMember.belongsTo(User, { foreignKey: "user_id" });
ProjectMember.belongsTo(Project, { foreignKey: "project_id" });

/* export all models */
module.exports = {
    User,
    Project,
    ProjectMember,
};