/* require dependencies */
const { Issue, User, Project, ProjectMember } = require("../models");
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
                return res.status(403).status({ message: "Not authorized to get an issue for this project." });         
        }

        const issue = await Issue.findOne({ 
            where: { id: issue_id, deleted: false }, 
            include: [
                { model: User , attributes: ["id", "username", "first_name", "last_name"] },
                { 
                    model: Project,
                    include: [{ 
                        model: User, 
                        attributes: ["id", "username", "first_name", "last_name"] 
                    }],
                }
            ],
        });

        if (!issue)
            return res.status(404).json({ message: "No issue exists with this id." });

        const projectObject = JSON.parse(JSON.stringify(issue.project));
        projectObject.owner = projectObject.user;
        delete projectObject.user;

        return res.status(200).json({
            id: issue.id,
            title: issue.title,
            content: issue.content,
            open: issue.open,
            priority: issue.priority,
            createdAt: issue.createdAt,
            updatedAt: issue.updatedAt,
            author: issue.user,
            project: projectObject,
            flairs: issue.flairs,
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
            flair: flairs,
        });

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
                where: { deleted: false },
                include: [{model: User}],
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
                flairs: issue.flairs,
                open: issue.open,
                priority: issue.priority,
                created: issue.createdAt,
            };
        });

        return res.status(200).json({ issues });
    }

    static async editStatus(req, res, next) {
        const { project_id, issue_id } = req.params;
        const { status } = req.body;
        const { user_id } = req.session;

        const issue = await Issue.findOne({
            where: { id: issue_id, deleted: false }
        });

        if (issue.author !== user_id) {
            const project = await Project.findOne({ where: { id: project_id } });
            if (!project) {
                return res.status(404).json({ message: "No project exists with this id." });
            }
            else if (project.owner !== req.session.user_id) {
                return res.status(403).json({ message: "Not authorized to change status of issue." });         
            }
        }

        if (!(typeof status === "boolean")) {
            return res.status(422).json({ message: "Status needs to be of type boolean." });
        }

        const updatedIssue = await Issue.update(
            { open: status }, 
            { where: { id: issue_id } }
        );
        return res.status(204).json({ message: "Status updated successfully" });
    }

    static async deleteIssue(req, res, next) {
        const { project_id, issue_id } = req.params;
        const { user_id } = req.session;

        const issue = await Issue.findOne({
            where: { id: issue_id }
        });

        if (issue.author !== user_id) {
            const project = await Project.findOne({ where: { id: project_id } });
            if (!project) {
                return res.status(404).json({ message: "No project exists with this id." });
            }
            else if (project.owner !== req.session.user_id) {
                return res.status(403).json({ message: "Not authorized to delete this issue." });         
            }
        }

        if (issue) {
            const updatedIssue = await Issue.update(
                { deleted: true }, 
                { where: { id: issue_id } }
            );
        }
        return res.status(204).json({ message: "Issue deleted successfully" });
    }

}

module.exports = IssueController;