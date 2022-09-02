/* require dependencies */
const { Issue, Flair, User, Project, ProjectMember } = require("../models");
const issueInvalidity = require("./validation/IssueValidator");

/* controller */
class IssueController {

    static async getIssue(req, res, next) {
        const { project_id, issue_id } = req.params;
        const { user_id } = req.session;

        const projectMember = await ProjectMember.findOne({
            where: { user_id: req.session.user_id, project_id: project_id }
        })

        if (!projectMember) {
            const project = await Project.findOne({ where: { id: project_id } });
            if (!project) return res.status(404).json({ message: "No project exists with this id." });
            else if (project.owner !== req.session.user_id)
                return res.status(403).status({ message: "Not authorized to create an issue for this project." });         
        }

        const issue = await Issue.findOne({ 
            where: { id: issue_id }, 
            include: [{ model: User , attributes: ["id", "username", "first_name", "last_name"] }],
        });

        const flairs = await Flair.findAll({
            where: { issue_id: issue_id }
        });

        let flairNames = flairs.map((flair) => flair.value)

        return res.status(200).json({
            id: issue.id,
            title: issue.title,
            content: issue.content,
            open: issue.open,
            priority: issue.priority,
            createdAt: issue.createdAt,
            updatedAt: issue.updatedAt,
            author: issue.user,
            project_id: issue.project_id,
            flairs: flairNames,
        });
    }
    
    static async createIssue(req, res, next) {
        const { title, content, flairs, priority } = req.body;
        const { project_id } = req.params;

        const issueInvalid = issueInvalidity(title, content, flairs, priority);
        if (issueInvalid) {
            return res.status(issueInvalid.status).json({ message: issueInvalid.message });
        }

        const projectMember = await ProjectMember.findOne({
            where: { user_id: req.session.user_id, project_id: project_id }
        })

        if (!projectMember) {
            const project = await Project.findOne({ where: { id: project_id } });
            if (!project) return res.status(404).json({ message: "No project exists with this id." });
            else if (project.owner !== req.session.user_id)
                return res.status(403).status({ message: "Not authorized to create an issue for this project." });         
        }

        const issue = await Issue.create({
            title, content, project_id,
            author: req.session.user_id,
            priority: priority,
        });

        const flairRecords = flairs.map((flair) => ({ value: flair, issue_id: issue.id }));

        const createdFlairs = await Flair.bulkCreate(flairRecords);

        return res.status(201).json({
            message: "Issue created successfully.",
            resource: {
                id: issue.id,
                title: issue.title,
                content: issue.content,
                project_id: issue.project_id,
                author: issue.author,
                flairs: flairs,
                open: issue.open,
                priority: issue.priority,
            }
        });
    }

    static async getIssuesByProject(req, res, next) {
        const { project_id } = req.params;

        const projectMember = await ProjectMember.findOne({
            where: { project_id, user_id: req.session.user_id },
        });

        const project = await Project.findOne({
            where: { id: project_id },
            include: [{ 
                model: Issue, 
                include: [{model: User}, {model: Flair}],
                order: [["createdAt", "DESC"]]
            }]
        });

        if (!project)
            return res.status(404).json({ message: "No project exists with this id." });
        
        if (!projectMember && project.owner !== req.session.user_id)
            return res.status(403).json({ message: "Not authorized to view issues for this project." });
        
        let issues = [];
        issues = project.issues.map((issue) => {
            return {
                id: issue.id,
                title: issue.title,
                content: issue.content,
                author: issue.author,
                flairs: issue.flairs.map(flair => flair.value),
                open: issue.open,
                priority: issue.priority,
                created: issue.createdAt,
            };
        });

        return res.status(200).json({ issues });
    }

}

module.exports = IssueController;