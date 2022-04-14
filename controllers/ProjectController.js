/* require dependencies */
const { User, Project, ProjectMember } = require("../models");
const projectInvalidity = require("./validation/ProjectValidator");

/* controller */
class ProjectController {

    static async getProject(req, res, next) {
        const { project_id } = req.params;
        
        const project = await Project.findOne({
            where: { id: project_id },
            include: [{
                model: User
            }]
        });

        if (!project) return res.status(404).json({ message: "A project with this id does not exist." });
        
        if (project.owner !== req.session.user_id)
            return res.status(403).json({ message: "This token is not authorized to access this project." });
        
        return res.status(200).json({
            name: project.name,
            description: project.description,
            owner: {
                id: project.user.id,
                username: project.user.username,
                first_name: project.user.first_name,
                last_name: project.user.last_name,
            }
        });
    }

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

    static async addMember(req, res, next) {
        const { user_id } = req.body;
        const { project_id } = req.params;
        
        const exists = await ProjectMember.findOne({ where: { user_id, project_id } });

        if (exists)
            return res.status(409).json({ message: "User is already member of group." });

        const project = await Project.findOne({ where: { id: project_id } });
        
        if (!project) return res.status(404).json({ message: "No project exists with this id." });

        const user = await User.findOne({ where: { id: user_id } });

        if (!user) return res.status(404).json({ message: "No user exists with this id." });

        if (req.session.user_id !== project.owner)
            return res.status(403).json({ message: "Not authorized to add a member to this project." });

        if (user_id === project.owner)
            return res.status(422).json({ message: "Cannot add owner as membber of project." });

        const member = await ProjectMember.create({ user_id, project_id });

        return res.status(201).json({
            message: "Member added successfully.",
            resource: {
                id: member.id,
                user_id: member.user_id,
                project_id: member.project_id
            }
        });
    }

}

module.exports = ProjectController;