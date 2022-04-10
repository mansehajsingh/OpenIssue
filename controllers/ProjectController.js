/* require dependencies */
const Project = require("../models/Project");
const User = require("../models/User");
const projectInvalidity = require("./validation/ProjectValidator");

/* controller */
class ProjectController {

    static async createProject(req, res, next) {
        const { name, description } = req.body;

        const projectInvalid = projectInvalidity(name, description);
        if (projectInvalid) {
            return res.status(projectInvalid.status).json({ message: projectInvalid.message });
        }

        const project = await Project.create({
            name: name,
            description: description,
            owner: req.session.user_id,
        });

        const owner = await User.findOne({ where: { id: req.session.user_id } });

        return res.status(201).json({
            message: "Project created successfully.",
            resource: {
                id: project.id,
                name: project.name,
                description: project.description,
                owner: {
                    id: owner.id,
                    username: owner.username,
                    first_name: owner.first_name,
                    last_name: owner.last_name,
                },
            },
        });
    }

}

module.exports = ProjectController;