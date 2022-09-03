/* require dependencies */
const User = require("./User");
const Project = require("./Project");
const ProjectMember = require("./ProjectMember");
const Issue = require("./Issue");
const Flair = require("./Flair");
const Reply = require("./Reply");

/**
 * This file is used to define all relations between models
 * before exporting them to the controllers.
 */

/* relations */
User.hasMany(Project, { foreignKey: "owner" });
User.hasMany(ProjectMember, { foreignKey: "user_id" });
User.hasMany(Issue, { foreignKey: "author" });
User.hasMany(Reply, { foreignKey: "author" });

Project.belongsTo(User, { foreignKey: "owner" });
Project.hasMany(ProjectMember, { foreignKey: "project_id" });
Project.hasMany(Issue, { foreignKey: "project_id" });

ProjectMember.belongsTo(User, { foreignKey: "user_id" });
ProjectMember.belongsTo(Project, { foreignKey: "project_id" });

Issue.belongsTo(Project, { foreignKey: "project_id" });
Issue.belongsTo(User, { foreignKey: "author" });
Issue.hasMany(Flair, { foreignKey: "issue_id" });
Issue.hasMany(Reply, {foreignKey: "issue_id"});

Flair.belongsTo(Issue, { foreignKey: "issue_id" });

Reply.belongsTo(Issue, { foreignKey: "issue_id" });
Reply.belongsTo(User, { foreignKey: "author" });

/* export all models */
module.exports = {
    User,
    Project,
    ProjectMember,
    Issue,
    Flair,
    Reply,
};